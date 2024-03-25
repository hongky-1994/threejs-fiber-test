import { RefObject } from "react";
import { Group, Object3DEventMap } from "three";

const debug = false;

type Props = {
  radius: number;
  wheelRef: RefObject<Group<Object3DEventMap>>;
};

export const WheelDebug = ({ radius, wheelRef }: Props) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.015, 16]} />
          <meshNormalMaterial transparent={true} opacity={0.25} />
        </mesh>
      </group>
    )
  );
};
