import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { RefObject, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useWheels } from "../hooks/useWheels";
import { Group, Object3DEventMap, Vector3Tuple } from "three";
import { useControls } from "../hooks/useControls";

const Car = () => {
  const result = useLoader(GLTFLoader, "models/car.glb").scene;

  const position = [-3, 0, 0] as Vector3Tuple;
  const rotation = [0, -Math.PI / 2, 0] as Vector3Tuple;
  const width = 0.15;
  const height = 0.005;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 4] as Vector3Tuple;
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
      rotation,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: wheelInfos as never,
      wheels: wheels as never,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useEffect(() => {
    if (!result) return;

    const mesh = result;
    mesh.scale.set(0.0007, 0.0007, 0.0007);

    mesh.children[0].position.set(0, 0, 0);
  }, [result]);

  return (
    <group ref={vehicle as RefObject<Group<Object3DEventMap>>} name="vehicle">
      <group
        ref={chassisBody as RefObject<Group<Object3DEventMap>>}
        name="chassisBody"
      >
        <primitive
          object={result}
          rotation-y={Math.PI / 2}
          position={[0, -0.13, 0]}
        />
      </group>
    </group>
  );
};

export default Car;
