import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";
import Track from "./Track";
import Ground from "./Ground";
import Car from "./Car";
// import ColliderBox from "./ColliderBox";
import { Vector3Tuple } from "three";
// import Ramp from "./Ramp";
const centerPointX = -2.3822;
const centerPointY = -0.0278;
const orbitTarget = [centerPointX, 0.5, centerPointY] as Vector3Tuple;

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <Environment files={"textures/envmap.hdr"} background={true} />
      <light />
      <PerspectiveCamera makeDefault position={[-2.3822, 5, 5]} fov={60} />
      <OrbitControls target={orbitTarget} />

      <Ground />
      <Track />
      <Car />
    </Suspense>
  );
};

export default Scene;
