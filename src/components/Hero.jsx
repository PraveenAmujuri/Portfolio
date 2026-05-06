import React, { useEffect, useState, Suspense, useRef } from "react";

import profile from "../assets/profile.webp";

import TextPressure from "../components/TextPressure";
import logo from "../assets/logo/logo.svg";
import {RevealWaveImage} from "./ui/reveal-wave-image";
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { Macbook } from "./Macbook";


const SHAPES = [

  "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",

  "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",

  "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)",

  "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)",

];

const ROLES = [
  "ANDROID DEV.",
  "WEB DEV.",
  "AI/ML DEV.",
  "OPEN SOURCE",
  "SYSTEM BUILDER"
];



export default function Hero() {

  const [shapeIdx, setShapeIdx] = useState(0);

  const [fading, setFading] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
const [role, setRole] = useState(ROLES[0]);
const [animKey, setAnimKey] = useState(0);
const [mainWord, suffixWord] = role.split(" ");
const controls = useRef();

const { progress } = useProgress(); // Tracks the actual download %
  const [isFinished, setIsFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // When progress hits 100, we give it a tiny buffer to "pre-warm" the GPU
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        // Start showing the main UI animations slightly after the fade
        setTimeout(() => setShowContent(true), 400);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

useEffect(() => {
  const interval = setInterval(() => {
    setRoleIndex((prev) => {
      const next = (prev + 1) % ROLES.length;

      // trigger re-animation
      setAnimKey((k) => k + 1);
      setRole(ROLES[next]);

      return next;
    });
  }, 3200); 

  return () => clearInterval(interval);
}, []);



  useEffect(() => {

    const interval = setInterval(() => {

      setFading(true);

      setTimeout(() => {

        setShapeIdx((i) => (i + 1) % SHAPES.length);

        setFading(false);

      }, 400);

    }, 2000);

    return () => clearInterval(interval);

  }, []);



  // THE FIX: We now define the starting point of the full visual blocks.

  // We will tell the CSS Grid to make each of these span 2 mathematical rows.

  const emptyCells = [

    // Visual Row 2 (Spans Math Rows 3 & 4)

    [3,3], [3,4], [3,5], [3,6], [3,7],

    // Visual Row 3 (Spans Math Rows 5 & 6)

    [5,3], [5,4], [5,5], [5,6], [5,7],

    // Visual Row 4 (Spans Math Rows 7 & 8)

    [7,3], [7,4]

  ];

const baseDelay = 0.4; // wait for PRAVEEN to finish

  return (

    <>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&family=DM+Mono:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Notable&display=swap');
        /* ─── THE 100VH 16:9 WRAPPER ─── */

/* Locate this block in your CSS */
.blueprint-wrapper {
  margin-top: 40px;
  height: calc(100vh - 80px);
  width: 100%;
  /* CHANGE THIS from #1a1a1a to your grid color */
  background: #f8f8f7 !important; 
  box-sizing: border-box;
  /* You can remove or lighten this border too */
  border-bottom: 1px solid #f8f8f7; 
  z-index: 10;
}



        /* ─── THE 8x8 INTERNAL MATHEMATICAL GRID ─── */

/* ─── THE 8x8 INTERNAL MATHEMATICAL GRID ─── */

/* 1. THE GRID CONTAINER */

.grid-8x8 {

  display: grid;

  grid-template-columns: repeat(8, 1fr);

  grid-template-rows: repeat(8, 1fr);

  height: 100%;

  width: 100%;

 

  /* PURE MONOCHROME: A clean, neutral "Paper" Gray */

  /* Avoids the "washed out blue" or "warm" tones */

  background: #f8f8f7 !important;

  gap: 0;

  /* Deep charcoal for text, not pure black, for better legibility */

  color: #222;

}



/* 2. THE CELL BORDERS */

.grid-8x8 > div {

  background: #f8f8f7 !important;

  min-height: 0;

  min-width: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  position: relative;

  box-sizing: border-box; /* CRITICAL: Keeps the 1px border inside the cell */



  /*

     HAIRLINE EFFECT:

     Using 1px solid with 10% opacity black.

     This renders perfectly on all screens and looks like a fine pencil line.

  */

border-right: 1px solid rgba(0, 0, 0, 0.22);
border-bottom: 1px solid rgba(0, 0, 0, 0.22);

}



/* 3. THE OUTER WRAPPER (The "Frame") */

.blueprint-wrapper {

  margin-top: 40px;

  height: calc(100vh - 80px);

  width: 100%;

  /* Pure black outer frame to ground the design */

  background: #000;

  box-sizing: border-box;

  border: 1px solid rgba(0, 0, 0, 1);

}



/* 4. THE EMPTY CELLS (Consistency) */

.empty-grid-cell {

  background: #f8f8f7 !important;

  border-right: 1px solid rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

}



        /* =========================================

           YOUR EXACT SKETCH MAPPINGS

        ========================================= */



        .cell-logo {

          grid-area: 1 / 1 / 3 / 2;

          font-size: clamp(12px, 1.2vw, 16px);

          letter-spacing: 0.2em;

          text-transform: uppercase;

          color: #888;

        }

       

        .cell-applied-ai {

          grid-area: 1 / 2 / 3 / 6;

          flex-direction: column;

          font-family: 'Playfair Display', serif;

          font-size: clamp(32px, 4.5vw, 64px);

          font-weight: 900;

          text-transform: uppercase;

          line-height: 1.1;

          padding-left: 24px;

          align-items: flex-start !important;

        }


/* Update in Hero.js CSS section */

.cell-in-ai-dev {
  grid-area: 1 / 6 / 2 / 9;
  display: flex;
  align-items: flex-start;
  padding-top: 32px; 
  justify-content: flex-end;
  padding-right: 40px; 

  /* 
     THE LIGHTWEIGHT FIX:
     Switch from utilitarian Inter to elegant serif (Playfair Display).
  */
  font-family: 'Playfair Display', serif;
  font-size: clamp(14px, 1.2vw, 17px); /* Slightly refined size */
  color: #111;
  letter-spacing: 0.12em; /* CRITICAL: Increased spacing creates lightness */
  
  position: relative;
  z-index: 1;
}

.first-word-italic {
  /* Use the existing setup, but ensure font-family is consistent */
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400; /* Use a normal/light weight */
  margin-right: 6px; /* Subtle space before the comma */
}

.normal-text {
  /* 
     Match the elegant serif instead of the heavy sans-serif.
     The all-caps approach is maintained for technical authority, 
     but the font choice makes it feel delicate.
  */
  font-family: 'Playfair Display', serif;
  font-style: normal;
  font-weight: 400; /* Use a light weight */
  text-transform: uppercase;
  opacity: 0.7; /* Increased transparency for softness */
}

        .cell-projects {

          grid-area: 2 / 6 / 3 / 7;

          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.22) !important;

        }

       

        .cell-cgpa {

          grid-area: 2 / 7 / 3 / 8;

          flex-direction: column;

        }



        /* Shared style for the two stat boxes */

/* Update in Hero.js CSS section */
/* STATS: TECHNICAL MINIMALISM */

.cell-projects, .cell-cgpa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.stat-val {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: clamp(30px, 2.8vw, 38px); 
  color: #111;
  
  /* THE ALIGNMENT CORE */
  display: flex;
  align-items: center; /* This centers the + relative to the 15 */
  justify-content: center;
  line-height: 1;
  letter-spacing: -0.04em;
}

.stat-plus {
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  font-size: 0.5em; /* Slightly larger makes centering look more intentional */
  opacity: 0.3;
  margin-left: 8px; /* Breathing room */

  /* Reset any previous transforms */
  transform: none; 
  display: inline-block;
  line-height: 1;
}
.stat-lbl {
  font-family: 'Inter', sans-serif;
  font-weight: 500; /* Slightly bolder than the number for contrast */
  font-size: clamp(8px, 0.6vw, 10px);
  text-transform: uppercase;
  color: #a0a0a0;
  margin-top: 10px;
  /* Ultra-wide tracking makes small text feel engineered */
  letter-spacing: 0.5em; 
}

        .cell-name {

          grid-area: 2 / 8 / 9 / 9;

          background: #f4f1ec;

        }

/* Update in Hero.js CSS section */

.cell-name {
  grid-area: 2 / 8 / 9 / 9;
  background: #f8f8f7 !important;

  display: flex;
  align-items: stretch;
  justify-content: center;

  overflow: hidden;
}

.upright-text {
  height: 100%;
  display: flex;
  flex-direction: column;
    justify-content: space-between;

  align-items: center;
  letter-spacing: -0.03em;
}

.cell-name {
height: 100%;
  overflow: visible;
}

.upright-text {
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-between; /* 🔥 fills height */
  align-items: center;
}

.letter {
  font-family: 'Inter', sans-serif;
  font-weight: 300;

  font-size: min(13vh, 9vw); /* 🔥 THIS IS THE REAL FIX */

  line-height: 0.75; /* tighten */
  letter-spacing: -0.02em;

  color: #111;
  will-change: transform, opacity;
}


/* STRUCTURED DROP */
.letter-wrap.structured-drop {
  opacity: 0;
  transform: translateY(-100%) scale(0.98);

  animation: gridDrop 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes gridDrop {
  0% {
    opacity: 0;
    transform: translateY(-100%) scale(0.98);
  }

  70% {
    opacity: 1;
    transform: translateY(4%) scale(1);
  }

  100% {
    opacity: 1;
    transform: translateY(0%) scale(1);
  }
}
.letter-wrap {
  position: relative;
  display: block; /* 🔥 NOT inline-block */
  width: 100%;
  text-align: center;
  
}

/* FILLED TEXT (base) */
.letter-fill {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #111;
  transition: opacity 0.25s ease;
}

/* STROKE LAYER (hidden initially) */
.letter-stroke {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px #111;

  clip-path: inset(0 0 100% 0);
}
.letter-wrap:hover .letter-stroke {
  animation: strokeReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.letter-wrap:not(:hover) .letter-stroke {
  clip-path: inset(0 0 100% 0); /* reset */
}

.letter-wrap:hover .letter-fill {
  opacity: 0.2;
}

/* KEYFRAME */
@keyframes strokeReveal {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0 0 0% 0);
  }
}

        .cell-image {

          grid-area: 3 / 1 / 8 / 3;

          padding: 0 !important;

        }

        .sketch-img {

          width: 100%;

          height: 100%;

          object-fit: cover;

          object-position: center 15%;

          filter: grayscale(100%) contrast(1.15) brightness(0.9);

          transition: clip-path 0.4s ease, opacity 0.4s ease;

        }



        .cell-resume {

          grid-area: 8 / 1 / 9 / 3;

          font-size: clamp(12px, 1.5vw, 16px);

          letter-spacing: 0.15em;

          text-transform: uppercase;

          cursor: pointer;

          transition: background 0.2s, color 0.2s;

        }

        .cell-resume:hover {

          background: #1a1a1a !important;

          color: #f8f8f7;
          transition: background 0.25s ease, color 0.25s ease;

        }



.cell-android {
  grid-area: 7 / 5 / 9 / 8;

  display: flex;
  align-items: baseline; 

  padding: 0 10px 6px 10px;

  font-family: 'Inter', sans-serif;
  text-transform: uppercase;

  overflow: hidden;
  border-right: none !important;

 
}
  .main-wrap {
  display: inline-block;
  transform: scaleY(1.12);
  transform-origin: bottom;
}
.main {
  font-weight: 300;
  font-size: clamp(70px, 7vw, 140px);

  letter-spacing: -0.05em;
  line-height: 0.85;

  white-space: nowrap;
}
/* SMALL SUFFIX */
.suffix {
  font-size: clamp(24px, 2vw, 36px);
  margin-left: 10px;

  line-height: 1;
  letter-spacing: 0.08em;
  color: #333;

  opacity: 0;

  /* final position */
  transform: translateY(24px);

  animation: riseSuffix 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Add this to your style block */
.rise-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(80%);
  will-change: transform, opacity; /* 🔥 Force GPU acceleration */
  animation: riseSmooth 0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
}
/* DEV animation */

@keyframes riseSmooth {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes riseSuffix {
  0% {
    opacity: 0;
    transform: translateY(calc(24px + 40%));
  }

  100% {
    opacity: 0.85;
    transform: translateY(24px);
  }
}


/* target the project and cgpa cells to remove their right border */
.cell-cgpa {
  border-right: none !important;
}

/* target any empty grid cells that are in the 7th column */
/* Since your grid is 8 columns, column 7 is the one before your name */
.grid-8x8 > div[style*="grid-column: 7"], 
.grid-8x8 > div[style*="/ 8"] {
  border-right: none !important;
}


/* Add this specific selector for column 7 empty cells */
.empty-grid-cell[style*="7 / 8"] {
  border-right: none !important;
}

        /* ─── MOBILE OVERRIDE ─── */

        @media (max-width: 900px) {

          .blueprint-wrapper { margin-top: 60px; height: auto; }

          .grid-8x8 {

            grid-template-columns: 1fr;

            grid-template-rows: auto;

            height: auto;

          }

          .grid-8x8 > div {

            grid-area: auto !important;

            min-height: 100px;

          }

          .cell-image { min-height: 400px; }

          .empty-grid-cell { display: none !important; }

          .upright-text { writing-mode: horizontal-tb; text-orientation: mixed; letter-spacing: 0.2em; }

        }

/* Update this in Hero.js */
.cell-applied-ai {
  grid-area: 1 / 2 / 3 / 6;
  overflow: hidden; 
  display: flex;
  align-items: flex-end; /* Change from center to flex-end */
  justify-content: center;
  background: #f8f8f7 !important;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.text-pressure-wrapper {
  width: 100%;
  /* Slightly lower scale to prevent the top "A" from hitting the header */
  transform: scaleY(1.08); 
  /* Sets the anchor at the bottom so it only expands upwards */
  transform-origin: bottom; 
  display: block;
}
  

.text-pressure-wrapper {

  width: 100%;

  display: block;

  overflow: hidden;

  contain: paint; /* ✅ ONLY paint, NOT layout */

}

  .text-pressure-wrapper span {

  display: inline-block;

  white-space: nowrap;

}
.cell-logo {
  grid-area: 1 / 1 / 3 / 2;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
}

/* LOGO IMAGE */
.logo-img {
  width: 100%;
  height: 100%;

  max-width: 60px;
  max-height: 60px;

  object-fit: contain;

  transition: transform 0.25s ease, opacity 0.25s ease;
}

/* subtle hover (matches your design language) */
.cell-logo:hover .logo-img {
  transform: scale(1.05);
  opacity: 0.8;
}  
/* Add this to your style section */
/* Update in your style section */
.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  pointer-events: none; 
}
  .three-container canvas {
  /* 2. Make the model/canvas interactive again */
  pointer-events: auto; 
}
.cell-name, 
.cell-resume, 
.cell-image {
  position: relative;
  z-index: 40; 
  pointer-events: auto;
}
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #f8f8f7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s ease-in-out;
}

.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loader-name {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  letter-spacing: 0.8em;
  font-size: 14px;
  color: #111;
}

.loader-bar-bg {
  width: 200px;
  height: 2px;
  background: rgba(0,0,0,0.05);
  position: relative;
}

.loader-bar-fill {
  position: absolute;
  top: 0; left: 0; height: 100%;
  background: #111;
  transition: width 0.3s ease-out;
}

.loader-status {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #888;
  text-transform: uppercase;
}
      `}</style>


<div className={`loading-screen ${isFinished ? 'fade-out' : ''}`}>
        <div className="loader-content">
          <span className="loader-name">PRAVEEN AMUJURI</span>
          <div className="loader-bar-bg">
            <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="loader-status">
            {progress < 100 ? `LOADING ASSETS ${Math.round(progress)}%` : "READY TO EXPLORE"}
          </span>
        </div>
      </div>

<div className="blueprint-wrapper" style={{ position: 'relative' }}>
      {/* 1. THE 3D LAYER (FLOATING) */}
  {/* 1. FULL SCREEN 3D LAYER */}
<div className="three-container">
<Canvas 
  camera={{ position: [0, 2, 12], fov: 35 }}
  dpr={[1, 2]} // 🔥 Limit resolution on high-dpi screens to save GPU
  gl={{ antialias: true, powerPreference: "high-performance" }} // 🔥 Request GPU power
>
<OrbitControls 
  ref={controls} 
  enableZoom={false} 
  enablePan={false} 
  // 1. HORIZONTAL LIMITS (left to right)
  // -Math.PI / 4 is 45 degrees left, Math.PI / 4 is 45 degrees right
  minAzimuthAngle={-Math.PI / 3} 
  maxAzimuthAngle={Math.PI / 3}
  
  // 2. VERTICAL LIMITS (up and down)
  // Math.PI / 2 is level with the horizon. 
  // This range prevents flipping it upside down.
  minPolarAngle={Math.PI / 2.5} 
  maxPolarAngle={Math.PI / 1.8} 
  
  // 3. SMOOTHING
  enableDamping={true}
  dampingFactor={0.05}
/>

  <ambientLight intensity={1.5} />

  <Suspense fallback={null}>
    <Macbook 
      scale={12} 
      position={[1.5, -0.5, 0]} 
      controls={controls}
    />
    <Environment preset="studio" background={false} frames={1} />
  </Suspense>
</Canvas>
</div>

        <section className="grid-8x8">

         

<div className="cell-logo">
  <img src={logo} alt="PAS Logo" className="logo-img" />
</div>

         

<div className="cell-applied-ai">

  <div className="text-pressure-wrapper">

<TextPressure
  text="APPLIED AI ENGINEER"
  fontFamily="Compressa VF"
  fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
  textColor="#111111"
  
  minFontSize={58} // Increased for "trapping"
  style={{ letterSpacing: '-0.06em' }} // The "Crunch"
  weight={true}
  width={true}
  flex={true}
/>

  </div>

</div>

         

 <div className="cell-in-ai-dev">
  <span className="first-word-italic">ANITS</span>
  <span className="normal-text">, B.TECH, AI&ML</span>
</div>

         
<div className="cell-projects">
  <span className="stat-val">
    15<span className="stat-plus">+</span>
  </span>
  <span className="stat-lbl">Projects</span>
</div>

<div className="cell-cgpa">
  <span className="stat-val">7.62</span>
  <span className="stat-lbl">CGPA</span>
</div>

         



<div className="cell-name">
  <div className="upright-text">
{"PRAVEEN".split("").map((char, index) => (
  <span
    key={index}
    className={`letter-wrap ${isFinished ? "structured-drop" : ""}`}
    style={{ "--delay": `${index * 0.1}s` }}
  >
    <span className="letter letter-fill">{char}</span>
    <span className="letter letter-stroke">{char}</span>
  </span>
))}
  </div>
</div>
         
<div className="cell-image" style={{ position: 'relative' }}>
  <RevealWaveImage
    src={profile}
    waveSpeed={0.2}         // Slower for better professional feel
    waveFrequency={1.5}     // Less "busy"
    waveAmplitude={0.15}    // Subtle distortion
    revealRadius={0.4}     // Large enough to see the face on hover
    revealSoftness={0.8}    // Very smooth transition
    pixelSize={1}
  />
</div>
         

          <div

            className="cell-resume"

            onClick={() => window.open("/resume.pdf", "_blank")}

          >

            Get Resume

          </div>

         

<div className="cell-android" key={animKey}>
  <span className="main-wrap">
    <span className="main">
      {mainWord.split("").map((char, i) => (
        <span
          key={i}
          className={isFinished ? "rise-letter" : ""}
          style={{
            "--delay": `${baseDelay + i * 0.085}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  </span>

  {suffixWord && (
    <span
      className={isFinished ? "suffix" : ""}
      style={{
        animationDelay: `${baseDelay + mainWord.length * 0.085 + 0.05}s`,
      }}
    >
      {suffixWord}
    </span>
  )}
</div>




          {/* THE FIX: Render the empty cells to span 2 math rows (pos[0] + 2)

              This perfectly removes the horizontal half-lines while keeping vertical structure */}

          {emptyCells.map((pos, index) => (

            <div

              key={`empty-${index}`}

              className="empty-grid-cell"

              style={{ gridArea: `${pos[0]} / ${pos[1]} / ${pos[0] + 2} / ${pos[1] + 1}` }}

            ></div>

          ))}



        </section>

      </div>

    </>

  );

}

