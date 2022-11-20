import { ShaderMaterial } from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'
import guid from 'short-uuid'

class BlobMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_time: { value: 0.0 },
        u_intensity: { value: 0.3 }
      },
      vertexShader: glsl`
      #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl)
      uniform float u_intensity;
      uniform float u_time;
  
      varying vec2 vUv;
      varying float vDisplacement;

      void main() {
          vUv = uv;
  
          vDisplacement = cnoise3(position + vec3(2.0 * u_time));
        
          vec3 newPosition = position + normal * (u_intensity * vDisplacement);

          vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
        
          gl_Position = projectedPosition;
      }
    `,
      fragmentShader: glsl`
    uniform float u_intensity;
    uniform float u_time;
    
    varying vec2 vUv;
    varying float vDisplacement;
    
    void main() {
      float distort = 2.0 * vDisplacement * u_intensity;
    
      vec3 color = vec3(abs(vUv - 0.5) * 2.0  * (1.0 - distort), abs(sin(u_time * 2.0)));
      
      gl_FragColor = vec4(color ,1.0);
    }
    `
    })
  }

  set u_time(v) {
    this.uniforms.u_time.value = v
  }
  set u_intensity(v) {
    this.uniforms.u_intensity.value = v
  }
  get u_time() {
    return this.uniforms.u_time.value
  }
  get u_intensity() {
    return this.uniforms.u_intensity.value
  }
}

BlobMaterial.key = guid.generate()

extend({ BlobMaterial })

export { BlobMaterial }
