"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = "#38bdf8";
const BLUE = "#2563eb";

function WireGlobe() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={group} scale={1.55}>
      <mesh>
        <sphereGeometry args={[1.7, 20, 14]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.26} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.55, 12, 10]} />
        <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[2.15, 0.012, 6, 80]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0.35, 0.9, 0.2]}>
        <torusGeometry args={[2.45, 0.008, 6, 80]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function OrbitNodes() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3.55;
        return [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.15) * 0.55,
          Math.sin(angle) * radius,
        ] as [number, number, number];
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.07;
  });

  return (
    <group ref={group}>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color={i % 2 ? CYAN : BLUE} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <group position={[0, 0.05, 0]}>
        <WireGlobe />
        <OrbitNodes />
      </group>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0 h-full w-full touch-none"
      dpr={1}
      camera={{ position: [0, 0.35, 6.2], fov: 48 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
        stencil: false,
        depth: true,
      }}
      frameloop="always"
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
