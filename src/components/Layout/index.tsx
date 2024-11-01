import { ConnectButton } from './ConnectButton';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Layout({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles with more variety
    const particles = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount * 3; i += 3) {
      // Create a sphere distribution
      const radius = 5;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      posArray[i] = radius * Math.sin(theta) * Math.cos(phi);
      posArray[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      posArray[i + 2] = radius * Math.cos(theta);
      
      scaleArray[i/3] = Math.random();
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Create custom shader material for better-looking particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x8a2be2) },
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        uniform vec2 mousePosition;
        
        void main() {
          vec3 pos = position;
          
          // Add some movement
          pos.x += sin(pos.y * 0.5 + time * 0.5) * 0.5;
          pos.y += cos(pos.x * 0.5 + time * 0.5) * 0.5;
          
          // Mouse interaction
          float dist = length(pos.xy - mousePosition);
          pos.z += 5.0 / (dist + 5.0) * sin(time * 2.0);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 3.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          gl_FragColor = vec4(color, 1.0 - dist * 2.0);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particles, material);
    scene.add(particlesMesh);
    camera.position.z = 15;

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      material.uniforms.mousePosition.value.set(mousePosition.current.x * 5, mousePosition.current.y * 5);
    };

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.005;
      material.uniforms.time.value = time;

      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Start animation and add event listeners
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <div className="relative z-10">
        <header className="border-b border-cyan-500/30 backdrop-blur-sm bg-black/20">
          <div className="container mx-auto p-6 flex justify-between items-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-pointer tracking-wider">
              SwapNFT DEMO
            </h1>
            <ConnectButton />
          </div>
        </header>
        <main className="container mx-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}