import { Color, ShaderMaterial } from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'
import guid from 'short-uuid'
class CurveMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_colorA: {
          value: new Color('#FFE486')
        },
        u_colorB: {
          value: new Color('#FEB3D9')
        },
        u_time: {
          value: 0
        },
        u_xIntensity: {
          value: 3.0
        },
        u_zIntensity: {
          value: 2.0
        }
      },
      vertexShader: glsl`
        varying vec2 vUv;
        varying float vZ;

        uniform float u_time;
        uniform float u_xIntensity;
        uniform float u_zIntensity;

        void main() {
            vUv = uv;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            modelPosition.y += sin(modelPosition.x * 5.0 + u_time * u_xIntensity) * 0.1;
            modelPosition.y += sin(modelPosition.z * 6.0 + u_time * u_zIntensity) * 0.1;
          
            vZ = modelPosition.y;

            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
          
            gl_Position = projectedPosition;
        } 
        `,
      fragmentShader: glsl`
            varying vec2 vUv;
            varying float vZ;

            uniform vec3 u_colorA;
            uniform vec3 u_colorB;

            void main() {
                vec3 color = mix(u_colorA,u_colorB,vZ * 2.0 + 0.5);
                gl_FragColor = vec4(color,1.0);
            }
        `
    })
  }
  set u_time(v) { this.uniforms.u_time.value = v } // prettier-ignore
  get u_time() { return this.uniforms.u_time.value } // prettier-ignore
  get colorA() {
    return this.uniforms.u_colorA.value
  }
  get colorB() {
    return this.uniforms.u_colorB.value
  }
  get xIntensity() {
    return this.uniforms.u_xIntensity.value
  }
  set xIntensity(v) {
    this.uniforms.u_xIntensity.value = v
  }
  get zIntensity() {
    return this.uniforms.u_zIntensity.value
  }
  set zIntensity(v) {
    this.uniforms.u_zIntensity.value = v
  }
}

CurveMaterial.key = guid.generate()

extend({ CurveMaterial })
export { CurveMaterial }
