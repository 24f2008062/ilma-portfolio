'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpatialStore } from '@/lib/store';

export default function SkillConstellation() {
  const groupRef = useRef<THREE.Group>(null!);
  const selectedSkillId = useSpatialStore((state) => state.selectedSkillId);
  const setSelectedSkillId = useSpatialStore((state) => state.setSelectedSkillId);
  const portfolioData = useSpatialStore((state) => state.portfolioData);

  const skills = portfolioData.skills;

  // Connection line primitives
  const connectionPrimitives = useMemo(() => {
    if (!skills || skills.length <= 1) return [];
    const centerPos = new THREE.Vector3(...skills[0].position);
    return skills.slice(1).map((skill) => {
      const skillPos = new THREE.Vector3(...skill.position);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([centerPos, skillPos]);
      const lineMat = new THREE.LineBasicMaterial({ color: '#00f0ff', transparent: true, opacity: 0.25 });
      return new THREE.Line(lineGeo, lineMat);
    });
  }, [skills]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;

      const camZ = state.camera.position.z;
      // Skills constellation is centered at Z = 0, visible when camZ is between -15 and 15
      const isVisible = camZ > -15 && camZ < 15;
      groupRef.current.visible = isVisible;
    }
  });

  return (
    <group ref={groupRef} position={[-3.2, 0, 0]} scale={[0.9, 0.9, 0.9]}>
      {skills.map((skill) => {
        const isSelected = selectedSkillId === skill.id;
        const isFeatured = skill.isFeatured;
        const nodeColor = isFeatured ? '#f24e1e' : isSelected ? '#00ff9d' : skill.color;
        const scale = isFeatured ? 1.4 : isSelected ? 1.2 : 1.0;

        return (
          <group key={skill.id} position={skill.position as [number, number, number]}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSkillId(skill.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
              scale={[scale, scale, scale]}
            >
              <sphereGeometry args={[0.35, 32, 32]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isFeatured ? 1.5 : 0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {(isFeatured || isSelected) && (
              <mesh scale={[scale * 1.5, scale * 1.5, scale * 1.5]}>
                <octahedronGeometry args={[0.4, 0]} />
                <meshBasicMaterial color={nodeColor} wireframe transparent opacity={0.6} />
              </mesh>
            )}

            <Text
              position={[0, -0.65, 0]}
              fontSize={0.26}
              color={isSelected ? '#00ff9d' : '#ffffff'}
              anchorX="center"
              anchorY="top"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}

      {connectionPrimitives.map((lineObj, index) => (
        <primitive key={`line-${index}`} object={lineObj} />
      ))}
    </group>
  );
}
