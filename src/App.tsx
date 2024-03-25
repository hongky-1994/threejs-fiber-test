import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./App.css";
import { Physics } from "@react-three/cannon";

export default function App() {
  return (
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  );
}
