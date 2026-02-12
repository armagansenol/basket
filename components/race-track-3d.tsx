"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Text, Float } from "@react-three/drei";

// ============================================================================
// Types
// ============================================================================

interface LetterMarkerProps {
  letter: string;
  position: [number, number, number];
  color: string;
  index: number;
}

interface TrackCurveProps {
  laneIndex: number;
  color?: string;
}

// ============================================================================
// Letter Marker Component
// ============================================================================

function LetterMarker({ letter, position, color, index }: LetterMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Gentle floating animation with unique offset per marker
    const time = clock.getElapsedTime();
    const offset = index * 0.3;
    meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Main sphere with glossy material */}
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.2}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Letter text */}
        <Text
          position={[0, 0, 0.51]}
          fontSize={0.4}
          color="#1e293b"
          anchorX="center"
          anchorY="middle"
        >
          {letter}
        </Text>

        {/* Shadow plane */}
        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.2}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ============================================================================
// Track Surface with Painted Lanes
// ============================================================================

function TrackSurface() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;

    // Draw a circular/oval lane
    float drawCircularLane(vec2 uv, float radius, float width) {
      vec2 center = vec2(0.5, 0.5);

      // Make it slightly oval (wider horizontally)
      vec2 scaledUv = (uv - center) * vec2(1.2, 1.0);
      float dist = length(scaledUv);

      // Ring/circle at this radius
      float ring = abs(dist - radius);
      return smoothstep(width, width * 0.3, ring);
    }

    void main() {
      vec2 uv = vUv;
      vec3 baseColor = vec3(0.12, 0.11, 0.29); // Dark blue track
      vec3 lineColor = vec3(0.98, 0.75, 0.14); // Yellow lines

      // Draw 5 concentric oval lanes
      float lane0 = drawCircularLane(uv, 0.15, 0.008);
      float lane1 = drawCircularLane(uv, 0.22, 0.008);
      float lane2 = drawCircularLane(uv, 0.29, 0.008);
      float lane3 = drawCircularLane(uv, 0.36, 0.008);
      float lane4 = drawCircularLane(uv, 0.43, 0.008);

      float allLanes = lane0 + lane1 + lane2 + lane3 + lane4;
      allLanes = clamp(allLanes, 0.0, 1.0);

      vec3 color = mix(baseColor, lineColor, allLanes * 0.5);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 12, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

// ============================================================================
// Background Scattered Dots
// ============================================================================

function BackgroundDots() {
  const points = useMemo(() => {
    const dots: THREE.Vector3[] = [];
    const colors = ["#f97316", "#14b8a6", "#ec4899", "#8b5cf6"];

    for (let i = 0; i < 30; i++) {
      dots.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          Math.random() * -3
        )
      );
    }

    return dots;
  }, []);

  return (
    <group>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={["#f97316", "#14b8a6", "#ec4899", "#8b5cf6"][i % 4]}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// Scene Lighting
// ============================================================================

function SceneLighting() {
  return (
    <>
      {/* Key light from top-left */}
      <directionalLight
        position={[-5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Ambient fill */}
      <ambientLight intensity={0.4} />

      {/* Rim light */}
      <pointLight position={[5, 5, -5]} intensity={0.5} color="#a78bfa" />
    </>
  );
}

// ============================================================================
// Camera Controller
// ============================================================================

function CameraController() {
  const { camera } = useThree();

  useFrame(({ mouse, clock }) => {
    // Subtle parallax based on mouse
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      2 + mouse.y * 0.3,
      0.03
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================================================
// Main Scene
// ============================================================================

function Scene() {
  return (
    <>
      <SceneLighting />
      <CameraController />

      {/* Track surface with painted lanes */}
      <TrackSurface />

      {/* Fog for depth */}
      <fog attach="fog" args={["#1e1b4b", 8, 20]} />
    </>
  );
}

// ============================================================================
// Main Component Export
// ============================================================================

export default function RaceTrack3D() {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [-3, 4, 6], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Background gradient */}
        <color attach="background" args={["#1e1b4b"]} />

        <Scene />
      </Canvas>
    </div>
  );
}
