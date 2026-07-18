import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(1.5, -0.5, 0),
  new THREE.Vector3(-0.5, -0.8, -0.1),
  new THREE.Vector3(-1.8, -1.5, -0.3),
  new THREE.Vector3(-1.9, -2.78, -0.55),
])

useGLTF.preload('/models/macbook/scene-transformed.glb')

export function Macbook({
  startAnimation,
  scrollProgress = 0,
  scrollOffset = 0,
  controls,
  ...props
}) {

  const { camera } = useThree()

  const lidRef = useRef()
  const group = useRef()

  const introDone = useRef(false)
  const introProgress = useRef(0)

  const smoothedProgress = useRef(0)
  const smoothedOffset = useRef(0)
  const lastInteraction = useRef(0)

  const lastCameraPos = useRef(new THREE.Vector3(0, 2, 12))
  const lastCameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const defaultCameraPos = useRef(new THREE.Vector3(0, 2, 12))
  const defaultCameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const isTransitioning = useRef(false)

  const { nodes, materials } = useGLTF(
    '/models/macbook/scene-transformed.glb'
  )

  // FIX SCREEN GLITCHING
  materials['Material.002'].polygonOffset = true
  materials['Material.002'].polygonOffsetFactor = -4
  materials['Material.002'].polygonOffsetUnits = -4

  const [lidState, setLidState] = useState('closed')

  useFrame(() => {

    if (!group.current) return

    // Disable OrbitControls during intro drop
    if (controls && controls.current && !introDone.current) {
      controls.current.enabled = false
    }

    /*
      INTRO DROP
    */
    if (
      startAnimation &&
      !introDone.current
    ) {

      introProgress.current += 0.012

      if (introProgress.current >= 1) {
        introProgress.current = 1
        introDone.current = true
      }

      const t = introProgress.current

      // POSITION
      group.current.position.y =
        THREE.MathUtils.lerp(
          2.2,
          -0.5,
          t
        )

      group.current.position.x =
        THREE.MathUtils.lerp(
          2.3,
          1.5,
          t
        )

      // ROTATION
      group.current.rotation.x = 0

      group.current.rotation.y =
        THREE.MathUtils.lerp(
          0.95,
          0.24,
          t
        )

      group.current.rotation.z =
        THREE.MathUtils.lerp(
          0.10,
          0.025,
          t
        )

      // SCALE
      group.current.scale.setScalar(12)

      return
    }

    /*
      HERO -> ABOUT TRAVEL
    */
    if (introDone.current) {

      let lerpFactor = 0.05
      if (scrollProgress <= 0.001) {
        lerpFactor = 0.15 // Smooth but faster return when going to 0
      } else if (scrollProgress > 0.8) {
        // Linearly scale lerpFactor from 0.05 to 1.0 between 0.8 and 1.0 scrollProgress
        lerpFactor = THREE.MathUtils.mapLinear(
          Math.min(scrollProgress, 1.0),
          0.8,
          1.0,
          0.05,
          1.0
        )
      }

      smoothedProgress.current =
        THREE.MathUtils.lerp(
          smoothedProgress.current,
          scrollProgress,
          lerpFactor
        )

      // Snap to 0 when very close to prevent asymptotic slow decay and enable interactivity instantly
      if (scrollProgress <= 0.001 && smoothedProgress.current < 0.01) {
        smoothedProgress.current = 0
      }

      const rawT = smoothedProgress.current
      const t = THREE.MathUtils.clamp(rawT, 0, 1)

      /*
        CAMERA COORDINATION / ORBITCONTROLS SYNC
      */
      if (controls && controls.current) {
        if (t <= 0.001) {
          if (isTransitioning.current) {
            // Smooth transition has finished: snap exactly to the saved interactive camera pose
            camera.position.copy(lastCameraPos.current)
            controls.current.target.copy(lastCameraTarget.current)
            controls.current.update()
            controls.current.enabled = true
            isTransitioning.current = false
          } else {
            // Actively tracking user interactions in Hero mode
            controls.current.enabled = true
            lastCameraPos.current.copy(camera.position)
            lastCameraTarget.current.copy(controls.current.target)
          }
        } else {
          // Currently scrolling: disable controls and lock camera tracking
          isTransitioning.current = true
          controls.current.enabled = false
          
          const blendRange = 0.35
          // Calculate blend factor using the smoothed progress
          const t_val = Math.min(t / blendRange, 1)
          // Smoothstep easing: 3x^2 - 2x^3
          const t_blend = t_val * t_val * (3 - 2 * t_val)

          // Smoothly interpolate camera position from last interactive pose to default pose
          camera.position.lerpVectors(
            lastCameraPos.current,
            defaultCameraPos.current,
            t_blend
          )

          // Smoothly interpolate lookAt target from last interactive target to default target
          const currentTarget = new THREE.Vector3()
          currentTarget.lerpVectors(
            lastCameraTarget.current,
            defaultCameraTarget.current,
            t_blend
          )
          camera.lookAt(currentTarget)
        }
      }

      /*
        FOLLOW CURVE
      */
      const pathPoint = curve.getPoint(t)

      group.current.position.copy(pathPoint)

      /*
        HERO -> DESK ROTATION
      */

      if (t < 0.12) {

        // small stabilisation phase
        const localT = t / 0.12

        group.current.rotation.x =
          THREE.MathUtils.lerp(
            0,
            -0.05,
            localT
          )

        group.current.rotation.y = 0.24

        group.current.rotation.z = 0.025

      } else {

        const localT =
          (t - 0.12) / 0.88

        group.current.rotation.x =
          THREE.MathUtils.lerp(
            -0.05,
            -0.12,
            localT
          )

        group.current.rotation.y =
          THREE.MathUtils.lerp(
            0.24,
            0.180,
            localT
          )

        group.current.rotation.z =
          THREE.MathUtils.lerp(
            0.025,
            -0.030,
            localT
          )
      }

      /*
        SCALE
      */
      group.current.scale.setScalar(
        THREE.MathUtils.lerp(
          12,
          9,
          t
        )
      )

      /*
        AUTO LID SYSTEM
      */
      const nearDesk = t > 0.92

      if (t > 0.001 && t < 0.90) {
        // Force close when scrolling between Hero and About
        if (lidState !== 'closed') {
          setLidState('closed')
        }
      } else if (nearDesk) {
        // Auto open when landing on the desk, if not recently interacted (so user click can override it)
        const recentlyInteracted = Date.now() - lastInteraction.current < 3000
        if (!recentlyInteracted && lidState === 'closed') {
          setLidState('full')
        }
      }

      const container = document.querySelector('.three-container')
      if (container) {
        container.style.transform = `translateY(${scrollOffset}px)`
      }
    }

    /*
      LID ANIMATION
    */
    if (lidRef.current) {

      let target = 0

      if (lidState === 'partial') {
        target = -0.72
      }

      if (lidState === 'full') {
        target = -1.8
      }

      lidRef.current.rotation.x =
        THREE.MathUtils.lerp(
          lidRef.current.rotation.x,
          target,
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

      onClick={(e) => {

        e.stopPropagation()

        // interaction timestamp
        lastInteraction.current =
          Date.now()

        if (lidState === 'closed') {
          setLidState('partial')
        }

        else if (
          lidState === 'partial'
        ) {
          setLidState('full')
        }

        else {
          setLidState('closed')
        }
      }}
    >

      <group name="Sketchfab_Scene">

        <group name="GLTF_SceneRootNode">

          <group
            ref={lidRef}
            name="Bevels_2"
            position={[0, 0.008, -0.101]}
            scale={0.275}
          >

            <mesh
              geometry={nodes.Object_4.geometry}
              material={
                materials.PaletteMaterial001
              }
            />

            <mesh
              geometry={nodes.Object_6.geometry}
              material={
                materials.PaletteMaterial002
              }
            />

            <mesh
              geometry={nodes.Object_7.geometry}
              material={
                materials['Material.002']
              }
            />

          </group>
        </group>

        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.PaletteMaterial003}
          position={[0, -0.014, 0]}
          scale={0.275}
        />

        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.PaletteMaterial001}
          position={[0, 0.008, -0.104]}
          rotation={[1.949, 0, 0]}
          scale={0.275}
        />

        <mesh
          geometry={nodes.Object_21.geometry}
          material={materials.PaletteMaterial004}
          position={[0, -0.014, 0]}
          scale={0.275}
        />

        <mesh
          geometry={nodes.Object_27.geometry}
          material={
            materials[
              'Touch_Bar_Shot_2021-04-02_at_18.13.28'
            ]
          }
          position={[0, -0.014, 0]}
          scale={0.275}
        />

      </group>
    </group>
  )
}