'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Wireframe } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const CustomMaterial = () => {
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#00F0FF') },
        uColor2: { value: new THREE.Color('#FF004D') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;

        // Simple 3D noise
        float hash(vec3 p) {
            p = fract(p * 0.3183099 + .1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(in vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                           mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                       mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                           mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
        }

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          
          vec3 pos = position;
          float noiseFreq = 1.5;
          float noiseAmp = 0.15;
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y * noiseFreq + uTime, pos.z * noiseFreq);
          pos += normal * noise(noisePos) * noiseAmp;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnelTerm = dot(viewDirection, vNormal);
          fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
          fresnelTerm = pow(fresnelTerm, 3.0);

          vec3 colorMix = mix(uColor1, uColor2, sin(vPosition.y * 2.0 + uTime) * 0.5 + 0.5);
          vec3 finalColor = colorMix * 0.2 + colorMix * fresnelTerm * 2.0;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    }),
    []
  );

  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return <shaderMaterial ref={materialRef} args={[shaderArgs]} />;
};

const AnimatedObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Mouse interaction
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
      
      // Scale pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 16]} />
      <CustomMaterial />
      <mesh>
        <icosahedronGeometry args={[2.01, 2]} />
        <meshBasicMaterial color="#00F0FF" wireframe transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
};

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#00F0FF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#FF004D" />
        <AnimatedObject />
      </Canvas>
    </div>
  );
}
