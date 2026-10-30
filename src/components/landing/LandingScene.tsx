'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Floating "dev objects" for the landing page, built from primitives with toon
// shading (no model downloads). Kept light: ~15 objects, capped DPR, and the
// render loop stops entirely when the landing isn't visible.

import type { ScenePalette } from './palettes';

type Vec3 = [number, number, number];

// Three-step ramp for MeshToonMaterial: flat, cartoon-style light bands.
function useToonRamp() {
  return useMemo(() => {
    const tex = new THREE.DataTexture(new Uint8Array([70, 150, 255]), 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// Terminal-style text drawn onto a canvas and used as an unlit "screen" texture.
function makeScreenTexture(lines: { text: string; color: string }[], bg: string, font: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `600 34px ${font}`;
  ctx.textBaseline = 'top';
  lines.forEach((line, i) => {
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 32, 36 + i * 56);
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

type FloatProps = {
  position: Vec3;
  rotation?: Vec3;
  scale?: number;
  speed?: number;
  amplitude?: number;
  spin?: number;
  animate: boolean;
  children: React.ReactNode;
};

function Float({ position, rotation = [0, 0, 0], scale = 1, speed = 1, amplitude = 0.18, spin = 0.15, animate, children }: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  const phase = useMemo(() => position[0] * 1.7 + position[1] * 0.9, [position]);
  useFrame(({ clock }) => {
    if (!ref.current || !animate) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.y = position[1] + Math.sin(t) * amplitude;
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.7) * spin * 0.5;
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.5) * spin;
    ref.current.rotation.z = rotation[2] + Math.cos(t * 0.6) * spin * 0.3;
  });
  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {children}
    </group>
  );
}

function Terminal({ texture, body, dot, ramp }: { texture: THREE.Texture; body: string; dot: string[]; ramp: THREE.Texture }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[2.6, 1.8, 0.22]} />
        <meshToonMaterial color={body} gradientMap={ramp} />
      </mesh>
      <mesh position={[0, -0.1, 0.115]}>
        <planeGeometry args={[2.36, 1.38]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {dot.map((c, i) => (
        <mesh key={c} position={[-1.08 + i * 0.18, 0.74, 0.12]}>
          <circleGeometry args={[0.055, 16]} />
          <meshBasicMaterial color={c} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Laptop({ texture, body, ramp }: { texture: THREE.Texture; body: string; ramp: THREE.Texture }) {
  return (
    <group>
      <mesh position={[0, -0.06, 0.6]}>
        <boxGeometry args={[2.4, 0.12, 1.6]} />
        <meshToonMaterial color={body} gradientMap={ramp} />
      </mesh>
      <group position={[0, 0, -0.2]} rotation={[-0.25, 0, 0]}>
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[2.4, 1.6, 0.08]} />
          <meshToonMaterial color={body} gradientMap={ramp} />
        </mesh>
        <mesh position={[0, 0.8, 0.045]}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

// "</>" built from thin boxes.
function Brackets({ color, ramp }: { color: string; ramp: THREE.Texture }) {
  const bar = (pos: Vec3, rotZ: number, len = 0.75) => (
    <mesh position={pos} rotation={[0, 0, rotZ]}>
      <boxGeometry args={[len, 0.16, 0.16]} />
      <meshToonMaterial color={color} gradientMap={ramp} />
    </mesh>
  );
  return (
    <group>
      {bar([-0.75, 0.2, 0], 0.6)}
      {bar([-0.75, -0.2, 0], -0.6)}
      {bar([0, 0, 0], 1.2, 1.15)}
      {bar([0.75, 0.2, 0], -0.6)}
      {bar([0.75, -0.2, 0], 0.6)}
    </group>
  );
}

// A git branch: main line, a feature branch that merges back, and commit nodes.
function GitBranch({ main, branch, ramp }: { main: string; branch: string; ramp: THREE.Texture }) {
  const branchCurve = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0.7, -0.3, 0), new THREE.Vector3(0.7, 0.4, 0), new THREE.Vector3(0, 1, 0)]),
    [],
  );
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 2.4, 12]} />
        <meshToonMaterial color={main} gradientMap={ramp} />
      </mesh>
      <mesh>
        <tubeGeometry args={[branchCurve, 32, 0.06, 8, false]} />
        <meshToonMaterial color={branch} gradientMap={ramp} />
      </mesh>
      {([[0, -1, 0], [0, 0, 0], [0, 1, 0], [0.7, -0.05, 0]] as Vec3[]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshToonMaterial color={i === 3 ? branch : main} gradientMap={ramp} />
        </mesh>
      ))}
    </group>
  );
}

function Database({ colors, ramp }: { colors: string[]; ramp: THREE.Texture }) {
  return (
    <group>
      {colors.map((c, i) => (
        <mesh key={i} position={[0, i * 0.42 - 0.42, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.34, 28]} />
          <meshToonMaterial color={c} gradientMap={ramp} />
        </mesh>
      ))}
    </group>
  );
}

function Mug({ color, ramp }: { color: string; ramp: THREE.Texture }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.42, 0.36, 0.9, 24]} />
        <meshToonMaterial color={color} gradientMap={ramp} />
      </mesh>
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.07, 10, 20, Math.PI]} />
        <meshToonMaterial color={color} gradientMap={ramp} />
      </mesh>
    </group>
  );
}

// Small floating cubes ("pixels"), one instanced draw call, kept out of the text's centre.
function Pixels({ colors, count, animate }: { colors: string[]; count: number; animate: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.4;
        const radius = 3.6 + ((i * 37) % 30) / 10;
        return {
          pos: new THREE.Vector3(Math.cos(angle) * radius * 1.4, Math.sin(angle) * radius * 0.75, -1 - ((i * 13) % 6)),
          size: 0.09 + ((i * 7) % 5) * 0.03,
          speed: 0.4 + ((i * 11) % 10) / 15,
          color: new THREE.Color(colors[i % colors.length]),
        };
      }),
    [colors, count],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!ref.current) return;
    items.forEach((item, i) => ref.current!.setColorAt(i, item.color));
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [items]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = animate ? clock.elapsedTime : 0;
    items.forEach((item, i) => {
      dummy.position.set(item.pos.x, item.pos.y + Math.sin(t * item.speed + i) * 0.25, item.pos.z);
      dummy.rotation.set(t * item.speed, t * item.speed * 0.7, 0);
      dummy.scale.setScalar(item.size);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

// Camera drifts toward the cursor and pulls back slightly as the page scrolls.
function CameraRig({ animate }: { animate: boolean }) {
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  useFrame(() => {
    if (!animate) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    camera.position.x += (pointer.current.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (pointer.current.y * 0.55 - scroll * 1.5 - camera.position.y) * 0.04;
    camera.position.z += (10 + scroll * 2 - camera.position.z) * 0.06;
    camera.lookAt(0, -scroll * 0.8, 0);
  });
  return null;
}

function Objects({ palette, animate, compact, font }: { palette: ScenePalette; animate: boolean; compact: boolean; font: string }) {
  const ramp = useToonRamp();
  const { viewport } = useThree();
  const [pink, violet, amber, mint] = palette.accents;

  const screens = useMemo(
    () => ({
      dev: makeScreenTexture(
        [
          { text: '~/akanksha $', color: mint },
          { text: '> npm run dev', color: '#ffffff' },
          { text: '  ready on :3000', color: amber },
          { text: '> _', color: pink },
        ],
        palette.screen,
        font,
      ),
      merge: makeScreenTexture(
        [
          { text: 'git merge feature', color: violet },
          { text: 'conflicts: none ✓', color: mint },
          { text: 'crdt: converged', color: '#ffffff' },
        ],
        palette.screen,
        font,
      ),
      hello: makeScreenTexture(
        [
          { text: 'console.log(', color: amber },
          { text: '  "hello, world"', color: pink },
          { text: ')', color: amber },
        ],
        palette.screen,
        font,
      ),
      laptop: makeScreenTexture(
        [
          { text: 'const stack = [', color: '#ffffff' },
          { text: '  "web", "backend",', color: mint },
          { text: '  "ai"', color: pink },
          { text: '];', color: '#ffffff' },
        ],
        palette.screen,
        font,
      ),
    }),
    [palette, pink, violet, amber, mint, font],
  );

  useEffect(() => () => Object.values(screens).forEach((t) => t.dispose()), [screens]);

  // Spread objects to the edges of whatever viewport we have, leaving the centre for the name.
  const sx = Math.min(1, Math.max(0.42, viewport.aspect / 1.6));
  const sy = viewport.aspect < 1 ? 1.3 : 1;
  const at = (x: number, y: number, z: number): Vec3 => [x * sx, y * sy, z];
  const dots = [pink, amber, mint];

  return (
    <>
      <Float position={at(-5.1, 2.3, -1)} rotation={[0.08, 0.4, 0.04]} animate={animate}>
        <Terminal texture={screens.dev} body={palette.body} dot={dots} ramp={ramp} />
      </Float>
      <Float position={at(5.3, 2.1, -2)} rotation={[0.05, -0.45, -0.05]} animate={animate} speed={0.8}>
        <Terminal texture={screens.merge} body={palette.bodyAlt} dot={dots} ramp={ramp} />
      </Float>
      <Float position={at(4.6, -2.3, 0)} rotation={[0.5, -0.55, 0.05]} animate={animate} speed={0.7} scale={0.95}>
        <Laptop texture={screens.laptop} body={palette.body} ramp={ramp} />
      </Float>
      {!compact && (
        <Float position={at(-6.4, -1.6, -3)} rotation={[0, 0.5, 0.06]} animate={animate} speed={0.9} scale={0.8}>
          <Terminal texture={screens.hello} body={palette.bodyAlt} dot={dots} ramp={ramp} />
        </Float>
      )}
      <Float position={at(-2.6, 3.4, -3)} rotation={[0, 0.3, 0.1]} animate={animate} speed={1.1} spin={0.4} scale={0.75}>
        <Brackets color={pink} ramp={ramp} />
      </Float>
      <Float position={at(1.9, -3.5, -1.5)} rotation={[0, -0.3, -0.1]} animate={animate} speed={1.2} spin={0.4} scale={0.6}>
        <Brackets color={violet} ramp={ramp} />
      </Float>
      <Float position={at(1.8, 3.5, -4)} rotation={[0, 0, 0.3]} animate={animate} speed={0.9} spin={0.3} scale={0.8}>
        <GitBranch main={mint} branch={amber} ramp={ramp} />
      </Float>
      <Float position={at(-3.4, -3.1, -1)} rotation={[0.35, 0, 0.1]} animate={animate} speed={0.8} spin={0.25} scale={0.75}>
        <Database colors={[violet, pink, amber]} ramp={ramp} />
      </Float>
      {!compact && (
        <Float position={at(7.2, 0.1, -3)} rotation={[0.2, 0.4, 0.15]} animate={animate} speed={1} spin={0.3} scale={0.9}>
          <Mug color={amber} ramp={ramp} />
        </Float>
      )}
      <Pixels colors={[pink, violet, amber, mint]} count={compact ? 18 : 34} animate={animate} />
    </>
  );
}

export default function LandingScene({
  palette,
  active,
  reduceMotion,
  onReady,
}: {
  palette: ScenePalette;
  active: boolean;
  reduceMotion: boolean;
  onReady: () => void;
}) {
  const [font, setFont] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setCompact(window.innerWidth < 768);
    const mono = getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() || 'monospace';
    // Screens are drawn onto canvases, so wait for the mono font before painting them.
    document.fonts.ready.then(() => setFont(mono));
  }, []);

  if (!font) return null;

  const animate = active && !reduceMotion;

  return (
    <Canvas
      dpr={compact ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduceMotion ? 'demand' : active ? 'always' : 'never'}
      onCreated={onReady}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[-4, 6, 6]} intensity={2.2} />
      <pointLight position={[0, 0, 4]} intensity={6} distance={14} color={palette.accents[0]} />
      <CameraRig animate={animate} />
      <Objects palette={palette} animate={animate} compact={compact} font={font} />
    </Canvas>
  );
}
