'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

const techStack = [
  'Next.js', 'React', 'TypeScript', 'TailwindCSS', 
  'Three.js', 'WebGL', 'GSAP', 'Node.js', 
  'Python', 'Firebase', 'AWS', 'Docker'
];

const OrbitingText = ({ text, radius, speed, offset }: { text: string, radius: number, speed: number, offset: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      groupRef.current.position.x = Math.cos(time) * radius;
      groupRef.current.position.z = Math.sin(time) * radius;
      // Make text always face camera
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <Text
        color="#FFFFFF"
        fontSize={0.5}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#00F0FF"
        outlineOpacity={0.2}
      >
        {text}
      </Text>
    </group>
  );
};

const OrbitScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#0A0A0F" emissive="#00F0FF" emissiveIntensity={0.2} wireframe />
      </mesh>
      
      {/* Orbit Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.9, 4, 64]} />
        <meshBasicMaterial color="#FF004D" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.9, 6, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting Texts */}
      {techStack.map((tech, i) => {
        const radius = i % 2 === 0 ? 4 : 6;
        const speed = i % 2 === 0 ? 0.2 : -0.15;
        const offset = (i / techStack.length) * Math.PI * 2;
        return (
          <OrbitingText key={i} text={tech} radius={radius} speed={speed} offset={offset} />
        );
      })}
    </group>
  );
};

export default function TechOrbit() {
  return (
    <section className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
          <OrbitScene />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-20 text-center pointer-events-none">
        <h3 className="text-[12px] uppercase tracking-[3px] text-gray-500 mb-4 opacity-60">Tech Stack</h3>
        <h2 className="text-[38px] md:text-[56px] font-bold leading-[1.1] tracking-[-1px] mb-6">
          The <span className="text-gradient">Ecosystem</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-gray-400 max-w-xl mx-auto leading-[1.6]">
          We leverage cutting-edge frameworks and robust infrastructure to build systems that scale infinitely.
        </p>
      </div>
    </section>
  );
}
