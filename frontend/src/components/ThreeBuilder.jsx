import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Box = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="orange" />
  </mesh>
);

// Helper to set initial camera position and OrbitControls target
const CameraController = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    camera.position.set(2, 2, 2); // Adjust for the desired view angle
    controlsRef.current.target.set(0, 0, 0); // Look at the center of the box
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
        <Box />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default ThreeBuilder;
