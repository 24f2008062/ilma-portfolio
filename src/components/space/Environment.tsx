'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Environment() {
  const primaryPointsRef = useRef<THREE.Points>(null!);
  const secondaryPointsRef = useRef<THREE.Points>(null!);

  const count = 4000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorCyan = new THREE.Color('#00f0ff');
    const colorViolet = new THREE.Color('#7000ff');
    const colorEmerald = new THREE.Color('#00ff9d');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const radius = 3 + Math.random() * 14;
      const angle = u * Math.PI * 16;
      const z = (Math.random() - 0.5) * 110;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      const colorMix = Math.random();
      if (colorMix < 0.5) {
        tempColor.lerpColors(colorCyan, colorViolet, colorMix * 2);
      } else {
        tempColor.lerpColors(colorViolet, colorEmerald, (colorMix - 0.5) * 2);
      }

      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (primaryPointsRef.current) {
      primaryPointsRef.current.rotation.z = time * 0.04;
    }
    if (secondaryPointsRef.current) {
      secondaryPointsRef.current.rotation.z = -time * 0.02;
    }
  });

  return (
    <group>
      {/* Dense Primary Particle Vortex Tunnel */}
      <points ref={primaryPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Counter-Rotating Ambient Particle Cloud */}
      <points ref={secondaryPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Cyber Grid Horizon Floor */}
      <gridHelper
        args={[160, 80, '#00f0ff', '#7000ff']}
        position={[0, -8, -25]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}
