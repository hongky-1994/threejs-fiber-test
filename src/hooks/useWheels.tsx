import { useCompoundBody } from "@react-three/cannon";
import { RefObject, useRef } from "react";
import { Group, Object3DEventMap } from "three";

export const useWheels = (
  width: number,
  height: number,
  front: number,
  radius: number
) => {
  const wheels = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ] as RefObject<Group<Object3DEventMap>>[];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    axleLocal: [1, 0, 0],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front],
      isFrontWheel: false,
    },
  ];

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });

  useCompoundBody(propsFunc as never, wheels[0]);
  useCompoundBody(propsFunc as never, wheels[1]);
  useCompoundBody(propsFunc as never, wheels[2]);
  useCompoundBody(propsFunc as never, wheels[3]);

  return [wheels as RefObject<Group<Object3DEventMap>>[], wheelInfos];
};
