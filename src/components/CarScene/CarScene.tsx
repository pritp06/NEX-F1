import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function Body({ year, autoRotate, dragRotation, zoom }: { year: number; autoRotate: boolean; dragRotation: number; zoom: number }) {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const chassisProfile = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-2.05, 0.13);
    shape.quadraticCurveTo(-1.8, 0.25, -1.52, 0.27);
    shape.lineTo(-0.62, 0.29);
    shape.quadraticCurveTo(-0.36, 0.32, -0.2, 0.7);
    shape.quadraticCurveTo(-0.08, 0.86, 0.18, 0.61);
    shape.quadraticCurveTo(0.36, 0.4, 0.55, 0.3);
    shape.lineTo(2.48, 0.18);
    shape.quadraticCurveTo(2.87, 0.15, 3.04, 0.09);
    shape.lineTo(3.02, 0.04);
    shape.lineTo(-2.02, 0.04);
    shape.closePath();
    return shape;
  }, []);
  const colors = useMemo(() => year < 1960
    ? { body: '#f0eadc', accent: '#ed4a31', wing: '#11171a' }
    : year < 1985
      ? { body: '#dbb842', accent: '#11171a', wing: '#171b1c' }
      : year < 2022
        ? { body: '#ed4836', accent: '#f0eadc', wing: '#11171a' }
        : { body: '#c9ff2f', accent: '#ff593f', wing: '#101619' }, [year]);

  useFrame((_, delta) => {
    if (group.current) {
      const scrollOffset = !reducedMotion ? Math.min(window.scrollY / Math.max(window.innerHeight, 1), 4) * 0.22 : 0;
      group.current.rotation.y += (dragRotation + scrollOffset - group.current.rotation.y) * 0.1 + (autoRotate && !reducedMotion ? delta * 0.055 : 0);
    }
  });

  return (
    <group ref={group} rotation={[0.05, -0.55, 0]} scale={0.98 * zoom}>
      {/* Smooth side profile gives the concept car a continuous nose and engine cover. */}
      <mesh position={[0, 0, -0.49]} castShadow>
        <extrudeGeometry args={[chassisProfile, { depth: 0.98, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.035, bevelThickness: 0.025, curveSegments: 12 }]} />
        <meshStandardMaterial color={colors.body} roughness={0.3} metalness={0.16} />
      </mesh>
      {/* rounded side pods */}
      {[-0.72, 0.72].map((z) => (
        <mesh key={z} position={[-0.63, 0.24, z]} scale={[0.92, 0.25, 0.34]} castShadow>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color={colors.body} roughness={0.36} metalness={0.12} />
        </mesh>
      ))}
      {/* cockpit and driver helmet */}
      <mesh position={[-0.04, 0.62, 0]} scale={[0.38, 0.16, 0.28]} castShadow>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#101414" roughness={0.24} metalness={0.26} />
      </mesh>
      <mesh position={[-0.01, 0.77, 0]} scale={[0.2, 0.2, 0.18]} castShadow>
        <sphereGeometry args={[1, 24, 18]} />
        <meshStandardMaterial color={colors.accent} roughness={0.25} metalness={0.25} />
      </mesh>
      <mesh position={[-0.03, 0.79, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.15, 0.8, 0.8]} castShadow>
        <torusGeometry args={[0.26, 0.035, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#b8c1c0" metalness={0.72} roughness={0.3} />
      </mesh>
      {/* front and rear wings */}
      <mesh position={[2.95, 0.16, 0]} castShadow>
        <boxGeometry args={[0.24, 0.1, 2.35]} />
        <meshStandardMaterial color={colors.wing} roughness={0.42} />
      </mesh>
      <mesh position={[-1.72, 0.58, 0]} castShadow>
        <boxGeometry args={[0.18, 0.12, 1.75]} />
        <meshStandardMaterial color={colors.accent} roughness={0.38} />
      </mesh>
      <mesh position={[-1.85, 0.88, 0]} castShadow>
        <boxGeometry args={[0.13, 0.7, 0.14]} />
        <meshStandardMaterial color={colors.wing} roughness={0.4} />
      </mesh>
      {/* suspension links */}
      {[-1, 1].map((side) => [-1, 1].map((front) => (
        <mesh key={`${side}-${front}`} position={[front * 1.45, 0.31, side * 0.92]} rotation={[0, 0, front * 0.2]}>
          <boxGeometry args={[0.8, 0.045, 0.045]} />
          <meshStandardMaterial color="#424848" metalness={0.75} roughness={0.3} />
        </mesh>
      )))}
      {/* tires: actual 3D rotating geometry */}
      {[-1.55, 1.55].map((x) => [-1, 1].map((side) => (
        <group key={`${x}-${side}`} position={[x, 0.0, side * 1.08]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.48, 0.48, 0.34, 40]} />
            <meshStandardMaterial color="#171a1b" roughness={0.88} />
          </mesh>
          <mesh position={[0, side * 0.18, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.02, 32]} />
            <meshStandardMaterial color="#b2b1a9" metalness={0.82} roughness={0.25} />
          </mesh>
          <mesh position={[0, side * 0.195, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 24]} />
            <meshStandardMaterial color="#242829" metalness={0.55} roughness={0.3} />
          </mesh>
        </group>
      )))}
      {/* front wing end plates and rear diffuser */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[2.95, 0.29, side * 1.04]} castShadow>
          <boxGeometry args={[0.14, 0.28, 0.12]} />
          <meshStandardMaterial color={colors.wing} />
        </mesh>
      ))}
      <mesh position={[-1.75, 0.31, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.68]} />
        <meshStandardMaterial color="#262b2b" roughness={0.7} />
      </mesh>
      <mesh position={[-0.2, 0.54, 0]}>
        <boxGeometry args={[0.04, 0.04, 0.97]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

export function CarScene({ year, autoRotate }: { year: number; autoRotate: boolean }) {
  const [dragRotation, setDragRotation] = useState(-0.55);
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; rotation: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;
    drag.current = { x: event.clientX, rotation: dragRotation };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setDragRotation(drag.current.rotation + (event.clientX - drag.current.x) * 0.008);
  };
  const handlePointerUp = () => { drag.current = null; };
  const nudgeRotation = (amount: number) => setDragRotation((current) => current + amount);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      nudgeRotation(event.key === 'ArrowLeft' ? -0.25 : 0.25);
    }
  };

  return (
    <div className="car-scene" role="group" aria-label="Interactive three-dimensional educational Formula 1 car model. Drag to orbit or use the arrow keys." onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onKeyDown={handleKeyDown}>
      <Canvas camera={{ position: [6.2, 4.5, 7.5], fov: 34 }} dpr={[1, 1.2]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} onCreated={({ gl }) => gl.setClearAlpha(0)}>
        <ambientLight intensity={1.25} />
        <directionalLight position={[5, 8, 5]} intensity={2.3} color="#fff7e5" />
        <directionalLight position={[-5, 4, -6]} intensity={1.25} color="#b8e8e0" />
        <spotLight position={[0, 7, 0]} intensity={1.4} angle={0.6} penumbra={0.9} color="#c9ff2f" />
        <mesh position={[0, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[3.1, 1.15, 1]}>
          <circleGeometry args={[1, 48]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            uniforms={{ shadowColor: { value: new THREE.Color('#313b36') } }}
            vertexShader="varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }"
            fragmentShader="uniform vec3 shadowColor; varying vec2 vUv; void main(){ float d=length(vUv-vec2(0.5))*2.0; float a=(1.0-smoothstep(0.2,1.0,d))*0.17; gl_FragColor=vec4(shadowColor,a); }"
          />
        </mesh>
        <Body year={year} autoRotate={autoRotate} dragRotation={dragRotation} zoom={zoom} />
      </Canvas>
      <div className="car-scene-controls" aria-label="3D car controls">
        <button type="button" onClick={() => nudgeRotation(-0.45)} aria-label="Rotate car left">↶</button>
        <button type="button" onClick={() => nudgeRotation(0.45)} aria-label="Rotate car right">↷</button>
        <button type="button" onClick={() => setZoom((current) => Math.max(0.78, current - 0.1))} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setZoom((current) => Math.min(1.28, current + 0.1))} aria-label="Zoom in">+</button>
      </div>
    </div>
  );
}
