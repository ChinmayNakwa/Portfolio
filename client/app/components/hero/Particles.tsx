"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1800;

export default function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialRef = useRef<THREE.PointsMaterial>(null!);
  const intro = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame(({ mouse }) => {
    if (!pointsRef.current || !materialRef.current) return;

    intro.current = Math.min(intro.current + 0.015, 1);

    materialRef.current.opacity = 0.55 * intro.current;

    pointsRef.current.rotation.y += 0.0004 * intro.current;
    pointsRef.current.rotation.x += mouse.y * 0.00025 * intro.current;
    pointsRef.current.rotation.y += mouse.x * 0.00025 * intro.current;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        ref={materialRef}
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}
