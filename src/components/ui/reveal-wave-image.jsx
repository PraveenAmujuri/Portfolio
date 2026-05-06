"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
useTexture.preload("/path/to/your/profile.webp");
// Vertex and Fragment Shaders stay exactly as you have them.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRevealRadius;
  uniform float uRevealSoftness;
  uniform float uPixelSize;
  uniform float uMouseActive;
  uniform float uWaveSpeed;
  uniform float uWaveFrequency;
  uniform float uWaveAmplitude;
  uniform float uMouseRadius;
  varying vec2 vUv;

  float bayer4x4(vec2 pos) {
    int x = int(mod(pos.x, 4.0));
    int y = int(mod(pos.y, 4.0));
    int index = x + y * 4;
    float pattern[16];
    pattern[0] = 0.0; pattern[1] = 0.5; pattern[2] = 0.125; pattern[3] = 0.625;
    pattern[4] = 0.75; pattern[5] = 0.25; pattern[6] = 0.875; pattern[7] = 0.375;
    pattern[8] = 0.1875; pattern[9] = 0.6875; pattern[10] = 0.0625; pattern[11] = 0.5625;
    pattern[12] = 0.9375; pattern[13] = 0.4375; pattern[14] = 0.8125; pattern[15] = 0.3125;
    for (int i = 0; i < 16; i++) { if (i == index) return pattern[i]; }
    return 0.0;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime;
    float wave = sin(uv.y * uWaveFrequency + time * uWaveSpeed) * (uWaveAmplitude * 0.1);
    vec2 distortedUv = uv + vec2(wave, wave * 0.5);
    
    if (uMouseActive > 0.01) {
        float dist = distance(uv, uMouse);
        float ripple = sin(dist * uWaveFrequency * 5.0 - time * uWaveSpeed) * 
                       uWaveAmplitude * 0.05 * 
                       smoothstep(uMouseRadius, 0.0, dist) * uMouseActive;
        distortedUv += ripple;
    }

    vec4 color = texture2D(uTexture, distortedUv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float dither = bayer4x4(floor(gl_FragCoord.xy / uPixelSize));
    float adj = gray + (dither - 0.5) * 0.5;
    vec3 bw = vec3(adj < 0.33 ? 0.0 : (adj < 0.66 ? 0.5 : 1.0));
    float reveal = 1.0 - smoothstep(uRevealRadius * (1.0 - uRevealSoftness), uRevealRadius, distance(uv, uMouse));
    gl_FragColor = vec4(mix(bw, color.rgb, reveal * uMouseActive), color.a);
  }
`;

function ImagePlane({ src, aspectRatio, mousePos, ...props }) {
  const texture = useTexture(src);
  const meshRef = useRef();
  const mouseActiveRef = useRef(0);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uRevealRadius: { value: props.revealRadius },
    uRevealSoftness: { value: props.revealSoftness },
    uPixelSize: { value: props.pixelSize },
    uMouseActive: { value: 0 },
    uWaveSpeed: { value: props.waveSpeed },
    uWaveFrequency: { value: props.waveFrequency },
    uWaveAmplitude: { value: props.waveAmplitude },
    uMouseRadius: { value: props.mouseRadius },
  }), [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { uTime, uMouseActive, uMouse } = meshRef.current.material.uniforms;
    uTime.value = state.clock.elapsedTime;
    
    // Smooth transition for reveal fade
    mouseActiveRef.current = THREE.MathUtils.lerp(mouseActiveRef.current, props.isMouseInCanvas ? 1 : 0, 0.1);
    uMouseActive.value = mouseActiveRef.current;

    // Direct update from the prop passed from parent
    uMouse.value.lerp(mousePos, 0.2);
  });

  return (
    <mesh ref={meshRef} scale={[aspectRatio > 1 ? aspectRatio : 1, aspectRatio > 1 ? 1 : 1/aspectRatio, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent />
    </mesh>
  );
}

export const RevealWaveImage = ({ src, revealRadius = 0.2, revealSoftness = 0.5, pixelSize = 3, waveSpeed = 0.5, waveFrequency = 3.0, waveAmplitude = 0.2, mouseRadius = 0.2, className = "" }) => {
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  const containerRef = useRef();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setAspectRatio(img.naturalWidth / img.naturalHeight);
  }, [src]);

  // HANDLE MOUSE MANUALLY
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Convert mouse to 0-1 UV coordinates
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height; // Flip Y for GL
    setMousePos(new THREE.Vector2(x, y));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsMouseInCanvas(true)}
      onMouseLeave={() => setIsMouseInCanvas(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'none' }} // Optional: hides cursor for cleaner look
    >
      {aspectRatio && (
        <Canvas gl={{ antialias: false, stencil: false, depth: false }} camera={{ position: [0, 0, 1], fov: 90 }} style={{ pointerEvents: 'none' }}>
          <ImagePlane 
            src={src} 
            aspectRatio={aspectRatio} 
            isMouseInCanvas={isMouseInCanvas}
            mousePos={mousePos}
            revealRadius={revealRadius}
            revealSoftness={revealSoftness}
            pixelSize={pixelSize}
            waveSpeed={waveSpeed}
            waveFrequency={waveFrequency}
            waveAmplitude={waveAmplitude}
            mouseRadius={mouseRadius}
          />
        </Canvas>
      )}
    </div>
  );
};