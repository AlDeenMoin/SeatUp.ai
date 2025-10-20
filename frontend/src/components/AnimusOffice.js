import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './AnimusOffice.css';

// 3D Office Building Component
function OfficeBuilding({ isRotating }) {
  const buildingRef = useRef();

  // Auto-rotation when not hovering
  useFrame(() => {
    if (buildingRef.current && isRotating) {
      buildingRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={buildingRef}>
      {/* Main building structure */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 6, 4]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.3} 
          roughness={0.7} 
        />
      </mesh>
      
      {/* Windows pattern */}
      {Array.from({ length: 5 }).map((_, floor) =>
        Array.from({ length: 3 }).map((_, col) =>
          Array.from({ length: 3 }).map((_, row) => {
            const x = (col - 1) * 1.2;
            const y = floor * 1.1 - 0.5;
            const z = (row - 1) * 1.2;
            return (
              <mesh key={`window-${floor}-${col}-${row}`} position={[x, y, 2.01]}>
                <planeGeometry args={[0.4, 0.6]} />
                <meshStandardMaterial 
                  color="#60a5fa" 
                  emissive="#3b82f6" 
                  emissiveIntensity={0.5} 
                />
              </mesh>
            );
          })
        )
      )}
      
      {/* Ground floor entrance */}
      <mesh position={[0, 0.5, 2.01]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 5.1, 0]}>
        <boxGeometry args={[4.2, 0.3, 4.2]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
    </group>
  );
}

function AnimusOffice() {
  const [isRotating, setIsRotating] = useState(true);
  const [zoom, setZoom] = useState(1);

  const handlePointerEnter = () => {
    setIsRotating(false);
    setZoom(1.2);
  };

  const handlePointerLeave = () => {
    setIsRotating(true);
    setZoom(1);
  };

  return (
    <div className="animus-office-container">
      <div className="office-header">
        <h1>Animus Office - 3D Building View</h1>
        <p>Hover over the building to stop rotation and zoom in</p>
      </div>
      
      <div 
        className="canvas-container"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
      >
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[8, 5, 8]} fov={50} />
          <OrbitControls enableZoom={true} enablePan={true} />
          
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          
          {/* Office Building */}
          <OfficeBuilding isRotating={isRotating} />
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
        </Canvas>
      </div>
      
      <div className="office-controls">
        <button onClick={() => setIsRotating(!isRotating)}>
          {isRotating ? 'Stop Rotation' : 'Start Rotation'}
        </button>
      </div>
    </div>
  );
}

export default AnimusOffice;
