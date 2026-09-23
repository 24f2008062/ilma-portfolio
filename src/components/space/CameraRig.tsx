'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpatialStore } from '@/lib/store';

const CHAPTER_Z_MAP: Record<number, number> = {
  1: 8,
  2: 0,
  3: -15,
  4: -35,
  5: -50,
};

export default function CameraRig() {
  const scrollProgress = useSpatialStore((state) => state.scrollProgress);
  const activeChapter = useSpatialStore((state) => state.activeChapter);

  useFrame((state, delta) => {
    // Map scroll progress (0..1) to camera Z (8..-50)
    const targetZFromScroll = 8 - scrollProgress * 58;
    const targetZFromChapter = CHAPTER_Z_MAP[activeChapter] ?? 8;
    
    // Blend scroll progress with active chapter focus
    const targetZ = targetZFromScroll * 0.7 + targetZFromChapter * 0.3;

    // Smooth lerp damping for weightless spatial camera feeling
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      3,
      delta
    );

    // Subtle pointer parallax rotation
    const mouseX = state.pointer.x * 0.2;
    const mouseY = state.pointer.y * 0.2;

    state.camera.rotation.y = THREE.MathUtils.damp(
      state.camera.rotation.y,
      -mouseX * 0.3,
      2,
      delta
    );
    state.camera.rotation.x = THREE.MathUtils.damp(
      state.camera.rotation.x,
      mouseY * 0.3,
      2,
      delta
    );
  });

  return null;
}
