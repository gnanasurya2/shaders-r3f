import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils } from 'three'

import { BlobMaterial } from './BlobMaterial'

const Blob = () => {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  const meshRef = useRef()
  const hover = useRef(false)

  useEffect(() => {
    console.log(meshRef.current.geometry.attributes)
  }, [])
  useFrame((state) => {
    const { clock } = state

    ref.current.u_time = 0.4 * clock.getElapsedTime()
    ref.current.u_intensity = MathUtils.lerp(ref.current.u_intensity, hover.current ? 0.85 : 0.05, 0.02)
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      scale={1}
      onPointerOver={() => {
        hover.current = true
        console.log('hovering')
      }}
      onPointerOut={() => {
        hover.current = false
        console.log('not hovering')
      }}>
      <icosahedronGeometry args={[2, 20]} />
      <blobMaterial ref={ref} key={BlobMaterial.key} />
    </mesh>
  )
}

export default Blob
