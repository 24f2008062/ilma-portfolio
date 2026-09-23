'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpatialStore } from '@/lib/store';

export default function ExperiencePath() {
  const groupRef = useRef<THREE.Group>(null!);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const camZ = state.camera.position.z;
      const dist = Math.abs(camZ - (-18));
      const targetOpacity = THREE.MathUtils.clamp(1 - (dist - 5) / 14, 0, 1);

      groupRef.current.traverse((child) => {
        if ('material' in child && child.material) {
          const mat = child.material as THREE.Material;
          mat.transparent = true;
          mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 8, delta);
          child.visible = mat.opacity > 0.02;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[-3.2, 0, 0]} scale={[0.9, 0.9, 0.9]}>
      {portfolioData.experience.map((exp) => (
        <group key={exp.id} position={exp.position as [number, number, number]}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.0, 0.04, 16, 100]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
          </mesh>

          <mesh>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={0.8}
              wireframe
            />
          </mesh>

          <Text
            position={[0, 1.7, 0]}
            fontSize={0.38}
            color="#ffffff"
            anchorX="center"
            anchorY="bottom"
          >
            {exp.role.toUpperCase()}
          </Text>

          <Text
            position={[0, 1.2, 0]}
            fontSize={0.24}
            color="#00f0ff"
            anchorX="center"
            anchorY="bottom"
          >
            {`@ ${exp.organization} [${exp.period}]`}
          </Text>
        </group>
      ))}
    </group>
  );
}
