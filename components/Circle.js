import React, { useEffect, useRef } from "react";
import * as THREE from 'three';

export default function Circle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.TorusGeometry(0.6, 0.3, 30, 100);
    // const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    // const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 16, 1);
    // const geometry = new THREE.ConeGeometry(1, 2, 16, 1);
    

    // Materials
    const material = new THREE.PointsMaterial({
      size: 0.005
    });


    // Mesh
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);
    
    // surface material
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var sphere = new THREE.Mesh(geometry, material);
    // scene.add(sphere);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const resizeHandler = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', resizeHandler);

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 1;
    scene.add(camera);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
    //   sphere.rotation.y = 0.5 * elapsedTime;
    //   sphere.rotation.y = -0.5 * elapsedTime; // Changed to negative rotation
    sphere.rotation.x = 0.5 * elapsedTime; // Rotating around the x-axis

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl" />;
}
 