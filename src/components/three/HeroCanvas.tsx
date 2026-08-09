"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Grid, Line, OrbitControls } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const BLUE = "#1a56e8";
const LIGHT = "#4d8aff";
const SOFT = "#8eb6ff";

function WireGlobe() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.8, 40, 28]} />
        <meshBasicMaterial color={LIGHT} wireframe transparent opacity={0.26} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.8, 18, 14]} />
        <meshStandardMaterial
          color={BLUE}
          transparent
          opacity={0.1}
          metalness={0.4}
          roughness={0.35}
          emissive={BLUE}
          emissiveIntensity={0.18}
        />
      </mesh>
      {[0.65, 1.15, 1.55].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, i * 0.4]}>
          <torusGeometry args={[r, 0.01, 8, 120]} />
          <meshBasicMaterial color={SOFT} transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

function DataOrbit() {
  const group = useRef<THREE.Group>(null);
  const cubes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 2.85 + (i % 3) * 0.18;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.4) * 0.55,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.08 + (i % 4) * 0.02,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.1;
  });

  return (
    <group ref={group}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? LIGHT : SOFT}
            emissive={BLUE}
            emissiveIntensity={0.55}
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.15, 0.12, 0]}>
        <torusGeometry args={[2.9, 0.014, 10, 180]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.5, 0.85, 0.25]}>
        <torusGeometry args={[3.35, 0.01, 10, 180]} />
        <meshBasicMaterial color={SOFT} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function HexNetwork() {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let ring = 1; ring <= 4; ring++) {
      const count = ring * 6;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            Math.cos(a) * ring * 1.05,
            (ring % 2 === 0 ? 0.2 : -0.15) + Math.sin(i) * 0.06,
            Math.sin(a) * ring * 1.05,
          ),
        );
      }
    }
    pts.push(new THREE.Vector3(0, 0, 0));
    return pts;
  }, []);

  const lines = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 1.25) {
          pairs.push([points[i], points[j]]);
        }
      }
    }
    return pairs;
  }, [points]);

  return (
    <group position={[0, -0.05, 0]}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === points.length - 1 ? 0.06 : 0.04, 10, 10]} />
          <meshStandardMaterial
            color={i === points.length - 1 ? LIGHT : SOFT}
            emissive={BLUE}
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
      {lines.map((pair, i) => (
        <Line
          key={i}
          points={pair}
          color={SOFT}
          lineWidth={1}
          transparent
          opacity={0.2}
        />
      ))}
    </group>
  );
}

function PulseBeams() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.abs(Math.sin(t * 1.3 + i)) * 0.32;
      mesh.scale.y = 0.7 + Math.abs(Math.sin(t * 1.05 + i * 0.65)) * 1.1;
    });
  });

  return (
    <group ref={ref}>
      {[-2.4, -1.2, 0, 1.2, 2.4].map((x, i) => (
        <mesh key={i} position={[x, -2.1, -0.4]}>
          <boxGeometry args={[0.04, 1.6, 0.04]} />
          <meshBasicMaterial color={LIGHT} transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} color="#eef3ff" />
      <pointLight position={[-5, 3, -3]} intensity={1.25} color={BLUE} />
      <pointLight position={[4, -1, 5]} intensity={0.85} color={LIGHT} />

      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.28}>
        <group position={[0.6, 0.35, 0]} scale={1.15}>
          <WireGlobe />
          <HexNetwork />
          <DataOrbit />
        </group>
      </Float>

      <PulseBeams />

      <Grid
        position={[0, -2.35, 0]}
        args={[20, 20]}
        cellSize={0.55}
        cellThickness={0.55}
        cellColor="#1a56e8"
        sectionSize={2.75}
        sectionThickness={1.05}
        sectionColor="#4d8aff"
        fadeDistance={22}
        fadeStrength={1.2}
        infiniteGrid
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.28}
        maxPolarAngle={Math.PI / 1.65}
        minPolarAngle={Math.PI / 3.5}
        dampingFactor={0.06}
        enableDamping
      />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0 h-full w-full touch-none"
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.4, 8.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
