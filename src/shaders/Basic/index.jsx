import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { PlaneGeometry } from 'three'
import { CurveMaterial } from './CurveMaterial'

const BasicShader = () => {
  const { colorA, colorB, xIntensity, zIntensity } = useControls('Colors', {
    colorA: '#FFE486',
    colorB: '#FEB3D9',
    xIntensity: 3.0,
    zIntensity: 2.0
  })

  const ref = useRef()

  useFrame((state) => {
    const { clock } = state

    ref.current.u_time = clock.getElapsedTime()
  })

  return (
    <mesh scale={1.5} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <curveMaterial ref={ref} key={CurveMaterial.key} colorA={colorA} colorB={colorB} xIntensity={xIntensity} zIntensity={zIntensity} />
    </mesh>
  )
}

export default BasicShader
