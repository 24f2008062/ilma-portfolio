'use client';

import React, { Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import Environment from './Environment';
import CameraRig from './CameraRig';
import styles from './CanvasRoot.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.webglFallback}>
          <h2>[3D CONTEXT UNAVAILABLE]</h2>
          <p>Rendering 2D Spatial UI Mode</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function CanvasRoot() {
  return (
    <div className={styles.canvasContainer}>
      <WebGLErrorBoundary>
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#090a0f']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7000ff" />
          
          {/* Pure Clean 3D Particle Vortex & Camera Rig */}
          <Environment />
          <CameraRig />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
