'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Palette,
  Layers,
  Award,
  Globe,
  FolderGit2,
  Mail,
  MapPin,
  Sparkles,
  Phone,
  Users,
  Layout,
  Brush,
  Code
} from 'lucide-react';
import { useSpatialStore } from '@/lib/store';

// Inline SVG Vector for LinkedIn Logo
function LinkedinVector({ size = 48, color = '#00f0ff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Tab3DIcons() {
  const activeChapter = useSpatialStore((state) => state.activeChapter);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.15;
    }
  });

  const CHAPTER_Z = [0, -15, -30, -45, -60];

  return (
    <group ref={groupRef}>
      {/* CHAPTER 01: IDENTITY TAB ICONS (Z = 0) */}
      <group position={[-3.5, 0, CHAPTER_Z[0]]}>
        <Html transform distanceFactor={6} sprite>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            background: 'rgba(10, 11, 16, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '1.25rem 1.75rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            opacity: activeChapter === 1 ? 1 : 0.2,
            transform: activeChapter === 1 ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <Layout size={40} color="#00f0ff" />
            <Sparkles size={40} color="#00ff9d" />
            <Palette size={40} color="#ffffff" />
          </div>
        </Html>
      </group>

      {/* CHAPTER 02: SKILLS MATRIX TAB ICONS (Z = -15) */}
      <group position={[-3.5, 0, CHAPTER_Z[1]]}>
        <Html transform distanceFactor={6} sprite>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            alignItems: 'center',
            background: 'rgba(10, 11, 16, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '1.5rem 2rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            opacity: activeChapter === 2 ? 1 : 0.2,
            transform: activeChapter === 2 ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Palette size={44} color="#f24e1e" />
              <Brush size={44} color="#00c4cc" />
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Layers size={44} color="#a855f7" />
              <Code size={44} color="#00ff9d" />
            </div>
          </div>
        </Html>
      </group>

      {/* CHAPTER 03: EXPERIENCE & LEADERSHIP TAB ICONS (Z = -30) */}
      <group position={[-3.5, 0, CHAPTER_Z[2]]}>
        <Html transform distanceFactor={6} sprite>
          <div style={{
            display: 'flex',
            gap: '1.75rem',
            alignItems: 'center',
            background: 'rgba(10, 11, 16, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '1.5rem 2rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            opacity: activeChapter === 3 ? 1 : 0.2,
            transform: activeChapter === 3 ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <Award size={48} color="#00f0ff" />
            <Globe size={48} color="#00ff9d" />
            <Users size={48} color="#7000ff" />
          </div>
        </Html>
      </group>

      {/* CHAPTER 04: PROJECTS TAB ICONS (Z = -45) */}
      <group position={[-3.5, 0, CHAPTER_Z[3]]}>
        <Html transform distanceFactor={6} sprite>
          <div style={{
            display: 'flex',
            gap: '1.75rem',
            alignItems: 'center',
            background: 'rgba(10, 11, 16, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '1.5rem 2rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
            opacity: activeChapter === 4 ? 1 : 0.2,
            transform: activeChapter === 4 ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <FolderGit2 size={48} color="#00f0ff" />
            <Sparkles size={48} color="#00ff9d" />
            <Layout size={48} color="#ffffff" />
          </div>
        </Html>
      </group>

      {/* CHAPTER 05: CONTACT TAB ICONS (LINKEDIN & PHONE & MAIL) (Z = -60) */}
      <group position={[-3.5, 0, CHAPTER_Z[4]]}>
        <Html transform distanceFactor={6} sprite>
          <div style={{
            display: 'flex',
            gap: '1.75rem',
            alignItems: 'center',
            background: 'rgba(10, 11, 16, 0.85)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            padding: '1.5rem 2rem',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.45)',
            opacity: activeChapter === 5 ? 1 : 0.2,
            transform: activeChapter === 5 ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <LinkedinVector size={52} color="#00f0ff" />
            <Mail size={52} color="#00ff9d" />
            <Phone size={48} color="#ffaa00" />
            <MapPin size={48} color="#7000ff" />
          </div>
        </Html>
      </group>
    </group>
  );
}
