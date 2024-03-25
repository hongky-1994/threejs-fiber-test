import { useTrimesh } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { get } from "lodash";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Ramp = () => {
  const result = useLoader(GLTFLoader, "models/ramp.glb");

  const geometry = get(result.scene.children[0], "geometry") as unknown as any;

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
  return <group />
};
export default Ramp;
