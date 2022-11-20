import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import { MathUtils } from 'three'
const count = 3000
const BasicParticles = () => {
  const points = useRef()
  const { shape } = useControls({
    shape: {
      options: ['sphere', 'cube', 'newShape1']
    }
  })
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const distance = 1
    console.log(shape)
    for (let i = 0; i < count; i++) {
      let x, y, z
      switch (shape) {
        case 'cube': {
          x = (Math.random() - 0.5) * 2
          y = (Math.random() - 0.5) * 2
          z = (Math.random() - 0.5) * 2
          break
        }

        case 'sphere': {
          const theta = MathUtils.randFloatSpread(360)
          const phi = MathUtils.randFloatSpread(360)

          x = distance * Math.sin(theta) * Math.cos(phi)
          y = distance * Math.sin(theta) * Math.sin(phi)
          z = distance * Math.cos(theta)
          break
        }
        case 'newShape1': {
          const theta = MathUtils.randFloatSpread(360)
          const phi = MathUtils.randFloatSpread(360)

          x = distance * Math.cos(theta) * Math.cos(phi)
          y = distance * Math.cos(theta) * Math.sin(phi)
          z = distance * Math.cos(theta)
          break
        }
      }

      positions.set([x, y, z], i * 3)
    }
    if (points.current) {
      points.current.geometry.attributes.position.needsUpdate = true
    }
    return positions
  }, [shape])
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particlesPosition.length / 3} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#5786F5" size={0.025} />
    </points>
  )
}

export default BasicParticles
