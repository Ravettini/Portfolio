"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { SculptureFallback } from "./sculpture-fallback";

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <SculptureFallback /> : this.props.children;
  }
}

function Sculpture({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      t * 0.12 + (mobile ? 0 : pointer.x * 0.25),
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.25 + (mobile ? 0 : pointer.y * 0.15),
      3,
      delta,
    );
    group.current.position.y = Math.sin(t * 0.65) * 0.08;
  });
  return (
    <group ref={group} rotation={[0.25, 0.3, -0.2]}>
      {[
        [0.5, 0.2, 0.2],
        [1.3, 0.7, -0.65],
        [0.1, 1.1, 1.2],
      ].map((rotation, index) => (
        <mesh key={index} rotation={rotation as [number, number, number]}>
          <torusGeometry
            args={[1.55, 0.13, mobile ? 12 : 24, mobile ? 64 : 128]}
          />
          <meshStandardMaterial
            color={index === 1 ? "#304b77" : "#a0b0c8"}
            metalness={0.85}
            roughness={0.27}
          />
        </mesh>
      ))}
      <mesh>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#1b3158"
          metalness={0.7}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}

export default function SculptureScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");
    let available = false;
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2") || probe.getContext("webgl");
      available = !!context;
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      available = false;
    }
    const update = () => {
      setSupported(available && !reduced.matches);
      setMobile(narrow.matches);
    };
    update();
    reduced.addEventListener("change", update);
    narrow.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting && !document.hidden),
    );
    if (wrapper.current) observer.observe(wrapper.current);
    const onVisibility = () =>
      setVisible(
        !document.hidden &&
          !!wrapper.current &&
          wrapper.current.getBoundingClientRect().bottom > 0 &&
          wrapper.current.getBoundingClientRect().top < innerHeight,
      );
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return (
    <div ref={wrapper} className="sculpture-scene" aria-hidden="true">
      {(!supported || !ready) && <SculptureFallback />}
      {supported && (
        <SceneBoundary>
          <Canvas
            dpr={[1, mobile ? 1 : 1.5]}
            frameloop={visible ? "always" : "never"}
            camera={{ position: [0, 0, 5.6], fov: 42 }}
            gl={{
              alpha: true,
              antialias: !mobile,
              powerPreference: "low-power",
            }}
            onCreated={({ gl }) => {
              setReady(true);
              gl.domElement.addEventListener(
                "webglcontextlost",
                () => setSupported(false),
                { once: true },
              );
            }}
            fallback={<SculptureFallback />}
          >
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[3, 4, 3]}
              intensity={4}
              color="#e2e9ff"
            />
            <directionalLight
              position={[-4, -1, 2]}
              intensity={3}
              color="#355d9b"
            />
            {!mobile && (
              <pointLight
                position={[0, -3, -2]}
                intensity={18}
                color="#6a83ac"
              />
            )}
            <Sculpture mobile={mobile} />
          </Canvas>
        </SceneBoundary>
      )}
    </div>
  );
}
