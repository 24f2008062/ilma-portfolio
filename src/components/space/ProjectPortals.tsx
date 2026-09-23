'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpatialStore } from '@/lib/store';

export default function ProjectPortals() {
  const groupRef = useRef<THREE.Group>(null!);
  const selectedProjectId = useSpatialStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useSpatialStore((state) => state.setSelectedProjectId);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const camZ = state.camera.position.z;
      const dist = Math.abs(camZ - (-38));
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
      {portfolioData.projects.map((project) => {
        const isSelected = selectedProjectId === project.id;
        const color = isSelected ? '#00ff9d' : '#00f0ff';

        return (
          <group key={project.id} position={project.position as [number, number, number]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProjectId(project.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              <boxGeometry args={[3.2, 2.1, 0.1]} />
              <meshStandardMaterial
                color="#121318"
                emissive={color}
                emissiveIntensity={isSelected ? 0.6 : 0.2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>

            <mesh scale={[1.05, 1.05, 1.05]}>
              <boxGeometry args={[3.2, 2.1, 0.1]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
            </mesh>

            <Text
              position={[0, 0, 0.1]}
              fontSize={0.27}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.8}
            >
              {project.title.toUpperCase()}
            </Text>

            <Text
              position={[0, -0.7, 0.1]}
              fontSize={0.18}
              color={color}
              anchorX="center"
              anchorY="middle"
            >
              {project.subtitle}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
