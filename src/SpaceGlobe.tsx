import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Particle Globe
function DigitalGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Generate spherical particles
  const particleCount = 450;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    const radius = 1.8;
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock, mouse }) => {
    const elapsedTime = clock.getElapsedTime();
    if (globeRef.current) {
      // Rotate globe slowly, responsive to mouse coordinates
      globeRef.current.rotation.y = elapsedTime * 0.12 + mouse.x * 0.4;
      globeRef.current.rotation.x = elapsedTime * 0.05 + mouse.y * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = elapsedTime * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -elapsedTime * 0.2;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 20, 20]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          wireframe 
          transparent 
          opacity={0.12} 
        />
      </mesh>

      {/* Spherical Points Grid (Digital Earth) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          color="#06b6d4" 
          size={0.035} 
          transparent 
          opacity={0.7} 
          sizeAttenuation 
        />
      </points>

      {/* Core glowing light */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Orbital Satellite Ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.3, 2.32, 64]} />
        <meshBasicMaterial color="#06b6d4" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>

      {/* Orbiting Satellite Node 1 */}
      <mesh position={[2.1, 0.5, 0.8]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>

      {/* Orbital Satellite Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <ringGeometry args={[2.5, 2.51, 64]} />
        <meshBasicMaterial color="#8b5cf6" side={THREE.DoubleSide} transparent opacity={0.25} />
      </mesh>

      {/* Orbiting Satellite Node 2 */}
      <mesh position={[-2.4, -0.2, 0.4]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
    </group>
  );
}

export function SpaceGlobe() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        
        {/* Starfield in backdrop */}
        <Stars 
          radius={80} 
          depth={40} 
          count={750} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1.2} 
        />
        
        <DigitalGlobe />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          rotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
