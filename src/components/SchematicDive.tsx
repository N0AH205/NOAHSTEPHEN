"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

function GridSystem({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle float
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Horizontal Schematic Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Line
          key={`h-${i}`}
          points={[[-50, 0, (i - 10) * 5], [50, 0, (i - 10) * 5]]}
          color="#000000"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
      {/* Vertical Schematic Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[[(i - 10) * 5, 0, -50], [(i - 10) * 5, 0, 50]]}
          color="#000000"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
      
      {/* Floating Nodes */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={`node-${i}`} position={[
          ((i * 137.5) % 40) - 20,
          ((i * 221.7) % 10) - 5,
          ((i * 543.1) % 40) - 20
        ]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ target, onComplete }: { target: string | null, onComplete: () => void }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (target && cameraRef.current) {
      // RESET
      cameraRef.current.position.set(0, 5, 20);
      cameraRef.current.lookAt(0, 0, 0);
      setContentVisible(false);

      // THE DIVE
      const tl = gsap.timeline({
        onComplete: () => {
          setContentVisible(true);
          onComplete();
        }
      });

      tl.to(cameraRef.current.position, {
        z: -10,
        y: 0,
        duration: 2,
        ease: "power4.inOut"
      });

      tl.to(cameraRef.current.rotation, {
        x: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, 0);
    }
  }, [target, onComplete]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 20]} fov={50} />
      <ambientLight intensity={1} />
      <GridSystem active={!!target} />
      
      {contentVisible && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={[0, 0, -15]}>
            <mesh>
              <planeGeometry args={[16, 9]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.05} />
            </mesh>
            <Line 
              points={[[-8, 4.5, 0], [8, 4.5, 0], [8, -4.5, 0], [-8, -4.5, 0], [-8, 4.5, 0]]}
              color="#000000"
              lineWidth={1}
            />
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.5}
              color="black"
              font="/fonts/pixelify.woff" // We'll need to make sure this matches or use fallback
            >
              {target?.toUpperCase()} // ACCESS GRANTED
            </Text>
          </group>
        </Float>
      )}
    </>
  );
}

export default function SchematicDive({ target, onComplete }: { target: string | null, onComplete: () => void }) {
  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white pointer-events-none">
      <Canvas>
        <Scene target={target} onComplete={onComplete} />
      </Canvas>
    </div>
  );
}
