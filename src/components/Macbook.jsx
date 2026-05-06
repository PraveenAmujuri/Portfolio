import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
useGLTF.preload('/models/macbook/scene-transformed.glb');
export function Macbook({ controls, ...props }) {
  const lidRef = useRef()
  const group = useRef()
  const [open, setOpen] = useState(false)
  

  const { nodes, materials } = useGLTF('/models/macbook/scene-transformed.glb')

useFrame(() => {
  if (lidRef.current) {
    const targetRotation = open ? -1.8 : 0

    lidRef.current.rotation.x = MathUtils.lerp(
      lidRef.current.rotation.x,
      targetRotation,
      0.1
    )
  }
})

  return (
    <group
      ref={group}
      {...props}
      dispose={null}

      /* 🔥 Disable OrbitControls while interacting */
      // onPointerDown={(e) => {
      //   e.stopPropagation()
      //   if (controls?.current) controls.current.enabled = false
      // }}

      // onPointerUp={(e) => {
      //   e.stopPropagation()
      //   if (controls?.current) controls.current.enabled = true
      // }}

      /* ✅ REAL DOUBLE CLICK */
      onDoubleClick={(e) => {
        e.stopPropagation()
        setOpen((prev) => !prev)
        console.log("🔥 Lid toggled (double click)")
      }}
    >
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group 
  ref={lidRef}
  name="Bevels_2" 
  position={[0, 0.008, -0.104]} 
  scale={0.275}
>
            <mesh geometry={nodes.Object_4.geometry} material={materials.PaletteMaterial001} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.PaletteMaterial002} />
            <mesh geometry={nodes.Object_7.geometry} material={materials['Material.002']} />
          </group>
        </group>

        <mesh geometry={nodes.Object_14.geometry} material={materials.PaletteMaterial003} position={[0, -0.014, 0]} scale={0.275} />
        <mesh geometry={nodes.Object_16.geometry} material={materials.PaletteMaterial001} position={[0, 0.008, -0.104]} rotation={[1.949, 0, 0]} scale={0.275} />
        <mesh geometry={nodes.Object_21.geometry} material={materials.PaletteMaterial004} position={[0, -0.014, 0]} scale={0.275} />
        <mesh geometry={nodes.Object_27.geometry} material={materials['Touch_Bar_Shot_2021-04-02_at_18.13.28']} position={[0, -0.014, 0]} scale={0.275} />
      </group>
    </group>
  )
}