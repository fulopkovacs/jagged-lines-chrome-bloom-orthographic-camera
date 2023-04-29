import {Box, OrbitControls, OrthographicCamera} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer, HueSaturation} from '@react-three/postprocessing'
import {WebGLRenderer, WebGLRendererParameters} from 'three'

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        gl={(canvas: WebGLRendererParameters['canvas']) =>
          new WebGLRenderer({
            canvas,
            powerPreference: 'high-performance',
            antialias: false,
            stencil: false,
            depth: false,
          })
        }
      >
        <spotLight position={[-2, 4, 3]} intensity={0.7} />
        <ambientLight intensity={0.1} />
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial color="pink" />
        </Box>
        <OrbitControls />
        <OrthographicCamera makeDefault position={[2, 3, 2]} zoom={400} />
        <EffectComposer>
          <HueSaturation saturation={0.1} />
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.7}
            intensity={10}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export default App
