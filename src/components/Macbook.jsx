import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
useGLTF.preload('/models/macbook/scene-transformed.glb');
export function Macbook({ controls, startAnimation, ...props }) {
  const lidRef = useRef()
  const group = useRef()

  

  const { nodes, materials } = useGLTF('/models/macbook/scene-transformed.glb')

  const [lidState, setLidState] = useState("closed")

const introDone = useRef(false)
const progress = useRef(0)
const initialised = useRef(false)

useFrame(() => {
if (!group.current) return

// SET INITIAL POSITION ONLY ONCE
if (!initialised.current) {
  group.current.position.set(2.3, 2.2, 0)

  group.current.rotation.set(
    0,
    0.95,
    0.10
  )

  initialised.current = true
}
  // INTRO DROP
  if (
  startAnimation &&
  !introDone.current &&
  group.current
) {

    progress.current += 0.012

    // stop animation
    if (progress.current >= 1) {
      progress.current = 1
      introDone.current = true
    }

    const t = progress.current

    // DROP POSITION
group.current.position.y = MathUtils.lerp(
  group.current.position.y,
  -0.5,
  0.05
)

group.current.position.x = MathUtils.lerp(
  group.current.position.x,
  1.5,
  0.05
)

    // KEEP FLAT
    group.current.rotation.x = 0

    // HORIZONTAL ROTATION
group.current.rotation.y = MathUtils.lerp(
  0.95,
  0.24,
  t
)

group.current.rotation.z = MathUtils.lerp(
  0.10,
  0.025,
  t
)
  }

  // EXISTING LID ANIMATION
  if (lidRef.current) {
let targetRotation = 0

if (lidState === "partial") {
  targetRotation = -0.8
}

if (lidState === "full") {
  targetRotation = -1.8
}

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
      visible={startAnimation}

      /* 🔥 Disable OrbitControls while interacting */
      // onPointerDown={(e) => {
      //   e.stopPropagation()
      //   if (controls?.current) controls.current.enabled = false
      // }}

      // onPointerUp={(e) => {
      //   e.stopPropagation()
      //   if (controls?.current) controls.current.enabled = true
      // }}

onClick={(e) => {
  e.stopPropagation()

  if (lidState === "closed") {
    setLidState("partial")
  } 
  else if (lidState === "partial") {
    setLidState("full")
  } 
  else {
    setLidState("closed")
  }
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