import { useBox } from "@react-three/cannon";

const debug = false;

type Props = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
};

const ColliderBox = ({ position, scale, rotation }: Props) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return debug ? (
    <mesh position={position} rotation={rotation ?? [0, 0, 0]}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent={true} opacity={0.25} />
    </mesh>
  ) : null;
};

export default ColliderBox;
