import { OrbitControls, hr } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo } from 'react'
import BasicShader from './shaders/Basic'
import Blob from './shaders/Blob'
import BasicParticles from './shaders/Points'
import ShaderPlane from './shaders/ShaderPlane'

export default function App() {
  const shadersMap = ['BasicShader', 'ShaderPlane', 'BasicParticles', 'Blob']
  const { shape1 } = useControls({
    shape1: {
      options: ['BasicShader', 'ShaderPlane', 'BasicParticles', 'Blob']
    }
  })
  const shaders = useMemo(
    () => ({
      BasicShader: <BasicShader />,
      ShaderPlane: <ShaderPlane />,
      BasicParticles: <BasicParticles />,
      Blob: <Blob />
    }),
    []
  )
  return (
    <>
      <Canvas dpr={[1, 2]} camera={{ position: [1.0, 1.5, 4.0] }}>
        <color attach="background" args={['black']} />
        {shaders[shape1]}
        <OrbitControls />
        <axesHelper />
      </Canvas>
    </>
  )
}
