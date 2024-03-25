import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { TextureLoader } from "three";

const Ground = () => {
  usePlane(() => ({ type: "Static", rotation: [-Math.PI / 2, 0, 0] }));

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  const gridMap = useLoader(TextureLoader, "textures/grid.png");
  const aoMap = useLoader(TextureLoader, "textures/ground-ao.png");
  const alphaMap = useLoader(TextureLoader, "textures/alpha-map.png");

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>
      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <circleGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          blur={[1024, 512]}
          mixBlur={6}
          mixStrength={100}
          mixContrast={0.9}
          mirror={0}
        ></MeshReflectorMaterial>
      </mesh>
    </>
  );
};

export default Ground;
