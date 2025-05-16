import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// const BurgerModel = () => {
//   const { scene } = useGLTF('/models/eevee.glb'); // adjust path as needed
//   const ref = useRef();

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.005; // Slow rotation
//     }
//   });

//   return <primitive ref={ref} object={scene} scale={0.5} />;
// };

const Box = () => {
  const meshRef = useRef();
  const [rotationSpeed] = useState({
    x: Math.random() * 0.01 + 0.001,
    y: Math.random() * 0.01 + 0.001,
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.x;
      meshRef.current.rotation.y += rotationSpeed.y;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const CameraController = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    camera.position.set(2, 2, 2);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, [camera]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
};

const ThreeBuilder = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} />
        <Box/>
        <CameraController />
      </Canvas>
    </div>
  );
};

export default ThreeBuilder;
