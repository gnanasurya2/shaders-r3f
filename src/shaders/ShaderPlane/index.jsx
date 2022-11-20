import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { WaveMaterial } from './WaveMaterial'
import { useControls } from 'leva'
function ShaderPlane() {
  const ref = useRef()

  const { startColor, endColor } = useControls('Colors', {
    startColor: '#7d7bff',
    endColor: '#070a41'
  })
  const { width, height } = useThree((state) => state.viewport)
  useFrame((state, delta) => (ref.current.time += delta))
  return (
    <mesh scale={[width, height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      {/* We use the materials module 🔑 to allow HMR replace */}
      <waveMaterial ref={ref} key={WaveMaterial.key} colorStart={startColor} colorEnd={endColor} />
    </mesh>
  )
}

export default ShaderPlane
