import {
  Box,
  OrbitControls,
  OrthographicCamera,
  useGLTF,
} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Bloom, EffectComposer, HueSaturation} from '@react-three/postprocessing'
import {useMemo} from 'react'
import {WebGLRenderer, WebGLRendererParameters} from 'three'

function App() {
  const {scene} = useGLTF('./Barracks_SecondAge_Level3.gltf')
  const ortho = useMemo(() => {
    const {search} = new URL(window.location.href)
    const searchParams = new URLSearchParams(search)
    return searchParams.get('ortho') !== 'false'
  }, [])

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
        <primitive object={scene} position={[0, -0.5, 0]}></primitive>
        <OrbitControls />
        {ortho && (
          <OrthographicCamera makeDefault position={[2, 3, 2]} zoom={400} />
        )}
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
