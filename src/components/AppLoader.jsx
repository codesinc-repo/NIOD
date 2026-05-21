import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './AppLoader.css';

const AppLoader = ({ onComplete }) => {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Keep progress value in ref for Three.js render loop access
  const progressRef = useRef(0);

  // Dynamic progress loader
  useEffect(() => {
    const duration = 4000; // 4s total loading progress
    const startTime = performance.now();

    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(calculatedProgress));
      progressRef.current = calculatedProgress;

      if (calculatedProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Complete! Wait for final splash animation, then transition
        setIsDone(true);
        const exitTimeout = setTimeout(() => {
          if (onComplete) onComplete();
        }, 800); // 800ms matching CSS transition perfectly
        return () => clearTimeout(exitTimeout);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Three.js 3D Scene Initialization and Loop
  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- 1. Scene, Camera, & Renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main glowing key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // High tech back glowing light for clear glass highlight
    const rimLight = new THREE.PointLight(0xfb923c, 4.5, 15);
    rimLight.position.set(0, 0, -3);
    scene.add(rimLight);

    // Neon side accents
    const blueFillLight = new THREE.DirectionalLight(0x0ea5e9, 1.8);
    blueFillLight.position.set(-5, -2, 2);
    scene.add(blueFillLight);

    const warmFillLight = new THREE.DirectionalLight(0xfcd34d, 1.2);
    warmFillLight.position.set(5, -3, -2);
    scene.add(warmFillLight);

    // --- 3. 3D Skincare Bottle Group ---
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // Dynamic Label Canvas Texture
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 512;
    labelCanvas.height = 256;
    const ctx = labelCanvas.getContext('2d');
    
    // Draw initial label
    const drawLabel = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(0, 0, 512, 256);
      
      // Border lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.lineWidth = 3;
      ctx.strokeRect(15, 15, 482, 226);
      
      // Scientific details
      ctx.fillStyle = '#000000';
      ctx.font = '800 36px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText('N I O D', 256, 85);
      
      ctx.font = '600 16px Outfit';
      ctx.fillText('COPPER AMINO ISOLATE SERUM', 256, 130);
      
      ctx.font = '500 12px Courier New';
      ctx.fillStyle = '#ea580c';
      ctx.fillText('CAIS3 • 2:1 CLINICAL CONCENTRATE', 256, 160);
      
      ctx.fillStyle = '#666666';
      ctx.font = '400 10px Courier New';
      ctx.fillText('BATCH: #4820-A // DERMAL D-LOAD', 256, 185);
      
      ctx.font = 'bold 11px Outfit';
      ctx.fillStyle = '#000000';
      ctx.fillText('DECIEM DERMAL SCIENCES', 256, 215);
    };
    drawLabel();
    const labelTexture = new THREE.CanvasTexture(labelCanvas);

    // Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9, 
      ior: 1.52,
      thickness: 0.25,
      specularIntensity: 1.0,
      specularColor: 0xffffff,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const liquidMaterial = new THREE.MeshStandardMaterial({
      color: 0xea580c,
      emissive: 0x9a3412,
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const goldMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.25,
      metalness: 0.95,
    });

    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2024,
      roughness: 0.85,
      metalness: 0.05,
    });

    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.35,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    // Construct Bottle Body Profile (Lathe Geometry)
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.85, 0.04));
    points.push(new THREE.Vector2(0.9, 0.1));
    points.push(new THREE.Vector2(0.9, 2.1));
    points.push(new THREE.Vector2(0.82, 2.22));
    points.push(new THREE.Vector2(0.4, 2.36));
    points.push(new THREE.Vector2(0.3, 2.42));
    points.push(new THREE.Vector2(0.3, 2.75));
    const bottleGeometry = new THREE.LatheGeometry(points, 32);
    const bottleMesh = new THREE.Mesh(bottleGeometry, glassMaterial);
    bottleMesh.position.y = -1.35; // Center geometry
    bottleGroup.add(bottleMesh);

    // Liquid inside bottle (slightly scaled down points)
    const liquidPoints = [];
    liquidPoints.push(new THREE.Vector2(0, 0.04));
    liquidPoints.push(new THREE.Vector2(0.78, 0.08));
    liquidPoints.push(new THREE.Vector2(0.82, 0.12));
    liquidPoints.push(new THREE.Vector2(0.82, 1.45)); // Liquid level at y = 1.45
    liquidPoints.push(new THREE.Vector2(0, 1.45));
    const liquidGeometry = new THREE.LatheGeometry(liquidPoints, 32);
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = -1.35;
    bottleGroup.add(liquidMesh);

    // Pipette Dropper Stem (inside)
    const pipetteGeometry = new THREE.CylinderGeometry(0.06, 0.06, 2.4, 16);
    const pipetteMesh = new THREE.Mesh(pipetteGeometry, glassMaterial);
    pipetteMesh.position.set(0, 0.1, 0);
    bottleGroup.add(pipetteMesh);

    // Pipette Gold Collar
    const collarGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.45, 32);
    const collarMesh = new THREE.Mesh(collarGeometry, goldMetalMaterial);
    collarMesh.position.set(0, 1.5, 0);
    bottleGroup.add(collarMesh);

    // Rubber Squeeze Bulb
    const bulbGeometry = new THREE.CylinderGeometry(0.24, 0.28, 0.65, 32);
    const bulbMesh = new THREE.Mesh(bulbGeometry, rubberMaterial);
    bulbMesh.position.set(0, 2.0, 0);
    bottleGroup.add(bulbMesh);

    // Premium Wrapper Label (Curved wrap)
    // Radius slightly larger than bottle (0.91), wrapped partially (-Math.PI/2 to Math.PI)
    const labelGeometry = new THREE.CylinderGeometry(0.915, 0.915, 1.1, 32, 1, true, -Math.PI / 2.3, Math.PI / 1.15);
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(0, -0.3, 0);
    bottleGroup.add(labelMesh);

    // Add extra shiny glass highlights
    const glowRingGeometry = new THREE.TorusGeometry(0.902, 0.02, 8, 32);
    const glowRingMesh = new THREE.Mesh(glowRingGeometry, glassMaterial);
    glowRingMesh.rotation.x = Math.PI / 2;
    glowRingMesh.position.set(0, -1.25, 0);
    bottleGroup.add(glowRingMesh);

    // --- 4. Scientific Orbiting Particles ---
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Helical or tilted particle rings
    const createOrbitRing = (radiusX, radiusZ, color, tiltX, tiltZ) => {
      const particleCount = 70;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radiusX;
        positions[i * 3 + 1] = Math.sin(angle * 2) * 0.15; // Wave effect in orbital path
        positions[i * 3 + 2] = Math.sin(angle) * radiusZ;
      }
      const ringGeom = new THREE.BufferGeometry();
      ringGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const ringMat = new THREE.PointsMaterial({
        color: color,
        size: 0.06,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const pointsObj = new THREE.Points(ringGeom, ringMat);
      pointsObj.rotation.x = tiltX;
      pointsObj.rotation.z = tiltZ;
      return pointsObj;
    };

    // Add three chemical orbits
    const blueOrbit = createOrbitRing(1.9, 1.9, 0x0ea5e9, Math.PI / 4, 0);
    const goldOrbit = createOrbitRing(2.3, 2.3, 0xfcd34d, -Math.PI / 5, Math.PI / 6);
    const pinkOrbit = createOrbitRing(1.6, 1.6, 0xec4899, Math.PI / 2.5, -Math.PI / 8);
    orbitGroup.add(blueOrbit);
    orbitGroup.add(goldOrbit);
    orbitGroup.add(pinkOrbit);

    // Large glowing sphere molecules active ingredients
    const moleculeGeom = new THREE.SphereGeometry(0.12, 32, 32);
    
    const blueMoleculesMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0ea5e9,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    
    const goldMoleculesMat = new THREE.MeshStandardMaterial({
      color: 0xfb923c,
      emissive: 0xfb923c,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
    });
    
    const pinkMoleculesMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xec4899,
      emissiveIntensity: 1.5,
      roughness: 0.1,
      metalness: 0.9,
    });

    const activeBlueMol = new THREE.Mesh(moleculeGeom, blueMoleculesMat);
    const activeGoldMol = new THREE.Mesh(moleculeGeom, goldMoleculesMat);
    const activePinkMol = new THREE.Mesh(moleculeGeom, pinkMoleculesMat);
    scene.add(activeBlueMol);
    scene.add(activeGoldMol);
    scene.add(activePinkMol);

    // --- 5. Interactive Particle Splash Engine ---
    const maxSplashParticles = 250;
    const splashPositions = new Float32Array(maxSplashParticles * 3);
    const splashVelocities = [];
    const splashColors = new Float32Array(maxSplashParticles * 3);
    const splashLifes = []; // Array of { age: 0, maxLife: 0 }
    
    const splashGeometry = new THREE.BufferGeometry();
    splashGeometry.setAttribute('position', new THREE.BufferAttribute(splashPositions, 3));
    splashGeometry.setAttribute('color', new THREE.BufferAttribute(splashColors, 3));
    
    // Spawn hidden initially
    for (let i = 0; i < maxSplashParticles; i++) {
      splashPositions[i * 3] = 999;
      splashPositions[i * 3 + 1] = 999;
      splashPositions[i * 3 + 2] = 999;
      splashVelocities.push(new THREE.Vector3(0, 0, 0));
      splashLifes.push({ age: 0, maxLife: 0 });
    }
    
    const splashMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const splashPoints = new THREE.Points(splashGeometry, splashMaterial);
    scene.add(splashPoints);

    let nextSplashIndex = 0;
    const spawnSplash = (position, count = 25, colorBase = 0xfb923c) => {
      const colors = [
        new THREE.Color(0xea580c), // copper/orange
        new THREE.Color(0xfb923c), // light amber
        new THREE.Color(0xfcd34d), // warm gold
        new THREE.Color(0x0ea5e9), // sky blue accent
      ];
      
      for (let i = 0; i < count; i++) {
        const index = nextSplashIndex;
        
        // Position
        splashPositions[index * 3] = position.x + (Math.random() - 0.5) * 0.15;
        splashPositions[index * 3 + 1] = position.y + (Math.random() - 0.5) * 0.15;
        splashPositions[index * 3 + 2] = position.z + (Math.random() - 0.5) * 0.15;
        
        // Velocity (spherical distribution)
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const speed = 0.05 + Math.random() * 0.12;
        
        splashVelocities[index].set(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed + 0.02, // drift upwards
          Math.cos(phi) * speed
        );
        
        // Random color
        const col = colors[Math.floor(Math.random() * colors.length)];
        splashColors[index * 3] = col.r;
        splashColors[index * 3 + 1] = col.g;
        splashColors[index * 3 + 2] = col.b;
        
        // Life
        splashLifes[index].age = 0;
        splashLifes[index].maxLife = 35 + Math.floor(Math.random() * 25);
        
        nextSplashIndex = (nextSplashIndex + 1) % maxSplashParticles;
      }
      
      splashGeometry.attributes.position.needsUpdate = true;
      splashGeometry.attributes.color.needsUpdate = true;
    };

    // --- 6. Click Handler to spawn splash ---
    let wiggleForce = 0;
    let wiggleTime = 0;

    const handleCanvasClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Project click point into 3D space
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const targetPos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      spawnSplash(targetPos, 45);

      // Trigger interactive squash/stretch wiggle physics
      wiggleForce = 0.55;
      wiggleTime = 0;
    };

    container.addEventListener('click', handleCanvasClick);

    // --- 7. Mouse Parallax Motion & Gravity ---
    const targetMouse = new THREE.Vector2(0, 0);
    const smoothedMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        targetMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // --- 8. Render Animation Loop ---
    const clock = new THREE.Clock();
    let explosionTriggered = false;
    let isExploding = false;
    let explosionTime = 0;

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const currentProgress = progressRef.current;

      // Smooth mouse lerping
      smoothedMouse.x += (targetMouse.x - smoothedMouse.x) * 0.06;
      smoothedMouse.y += (targetMouse.y - smoothedMouse.y) * 0.06;

      // Click wiggle bounce reaction physics (Squash & Stretch)
      let baseScaleX = 1.0;
      let baseScaleY = 1.0;
      let baseScaleZ = 1.0;

      if (wiggleForce > 0.005) {
        wiggleTime += 0.28;
        wiggleForce *= 0.93; // dampening
        const clickWiggle = Math.sin(wiggleTime) * wiggleForce;
        baseScaleX = 1.0 - clickWiggle * 0.16;
        baseScaleY = 1.0 + clickWiggle * 0.38; // squash and stretch
        baseScaleZ = 1.0 - clickWiggle * 0.16;
      }

      // Apply parallax rotation & floating motion to Bottle Group
      const floatOffset = Math.sin(time * 1.5) * 0.12;
      bottleGroup.position.y = floatOffset;
      
      // --- SYNCHRONOUS ZOOM-IN TRANSITION (Starts 2 seconds/50% progress before end) ---
      let zoomProgress = 0;
      if (currentProgress >= 50) {
        zoomProgress = (currentProgress - 50) / 50; // Smoothly maps 50%-100% progress to 0.0-1.0
      }

      // Rotate based on mouse AND add a spectacular left-to-right spin + roll tilt as it zooms!
      const portalSpinY = zoomProgress * Math.PI * 6.0; // 3 full 360-degree spins
      const portalSpinZ = zoomProgress * 0.6; // cinematic corkscrew roll tilt
      
      bottleGroup.rotation.y = smoothedMouse.x * 0.35 + time * 0.12 + portalSpinY;
      bottleGroup.rotation.x = -smoothedMouse.y * 0.25;
      bottleGroup.rotation.z = Math.sin(time * 0.8) * 0.02 + portalSpinZ;

      // Calculate exponential scale-up factor (zooms extremely fast at the end into liquid core)
      const zoomScale = 1.0 + Math.pow(zoomProgress, 4.0) * 120.0; // Grows smoothly to 121x scale

      // Set scale of the bottle group incorporating both wiggle physics and zoom progress
      bottleGroup.scale.set(
        baseScaleX * zoomScale,
        baseScaleY * zoomScale,
        baseScaleZ * zoomScale
      );

      // Set scale of orbits
      orbitGroup.scale.set(
        1.0 + zoomProgress * 30.0,
        1.0 + zoomProgress * 30.0,
        1.0 + zoomProgress * 30.0
      );

      // Fly the camera forward straight through the center of the bottle as progress increases
      camera.position.z = 8.5 - zoomProgress * 10.5; // camera flies straight through bottle z=0 down to -2.0
      camera.position.y = 0.5 - zoomProgress * 0.5; // aim directly through the coppery glowing center

      // Charge up key lighting and emission as we zoom closer, producing an epic flash
      rimLight.intensity = 4.5 + zoomProgress * 95.0;
      keyLight.intensity = 2.0 + zoomProgress * 35.0;
      blueFillLight.intensity = 1.8 + zoomProgress * 20.0;
      warmFillLight.intensity = 1.2 + zoomProgress * 15.0;

      // Dim down light rapidly at the very end (last 5% of loading) to blackout into page reveal
      if (zoomProgress > 0.95) {
        const fade = (1.0 - zoomProgress) / 0.05;
        ambientLight.intensity = 0.4 * fade;
        rimLight.intensity *= fade;
        keyLight.intensity *= fade;
        blueFillLight.intensity *= fade;
        warmFillLight.intensity *= fade;
      }

      // Continuous visual spark flight trails during the zoom
      if (zoomProgress > 0.1 && Math.random() < 0.55) {
        spawnSplash(new THREE.Vector3((Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, 0), 12);
      }

      // Animate liquid waves (subtle wave pulse in scale)
      const liquidScaleWave = 1.0 + Math.sin(time * 3.0) * 0.015;
      liquidMesh.scale.set(liquidScaleWave, 1.0, liquidScaleWave);
      
      // Gradually drain/adjust liquid level or increase glowing intensity as loaded
      liquidMaterial.emissiveIntensity = 0.5 + (currentProgress / 100) * 0.8 + Math.sin(time * 4) * 0.1;

      // Animate chemical orbits (rotate orbit rings)
      blueOrbit.rotation.y = time * 0.2;
      goldOrbit.rotation.y = -time * 0.15;
      pinkOrbit.rotation.y = time * 0.25;

      // Interactive mouse attraction: pull orbits slightly towards cursor
      orbitGroup.position.x = smoothedMouse.x * 0.28;
      orbitGroup.position.y = smoothedMouse.y * 0.22 + floatOffset;

      // Position active molecules on mathematical orbits
      // Blue Molecule
      const blueAngle = time * 1.5;
      activeBlueMol.position.x = Math.cos(blueAngle) * 1.9 + smoothedMouse.x * 0.15;
      activeBlueMol.position.z = Math.sin(blueAngle) * 1.9;
      activeBlueMol.position.y = Math.sin(blueAngle * 2) * 0.15 + floatOffset + smoothedMouse.y * 0.15;
      activeBlueMol.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 4));

      // Gold Molecule
      const goldAngle = -time * 1.2;
      activeGoldMol.position.x = Math.cos(goldAngle) * 2.3 + smoothedMouse.x * 0.2;
      activeGoldMol.position.z = Math.sin(goldAngle) * 2.3;
      activeGoldMol.position.y = Math.sin(goldAngle * 2) * 0.15 + floatOffset + smoothedMouse.y * 0.2;
      activeGoldMol.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 5).multiply(new THREE.Matrix4().makeRotationZ(Math.PI / 6)));

      // Pink Molecule
      const pinkAngle = time * 1.8;
      activePinkMol.position.x = Math.cos(pinkAngle) * 1.6 + smoothedMouse.x * 0.1;
      activePinkMol.position.z = Math.sin(pinkAngle) * 1.6;
      activePinkMol.position.y = Math.sin(pinkAngle * 2) * 0.15 + floatOffset + smoothedMouse.y * 0.1;
      activePinkMol.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2.5).multiply(new THREE.Matrix4().makeRotationZ(-Math.PI / 8)));

      // Update interactive splash particles
      let activeSplashes = false;
      const positions = splashGeometry.attributes.position.array;
      const colors = splashGeometry.attributes.color.array;
      
      for (let i = 0; i < maxSplashParticles; i++) {
        if (splashLifes[i].age < splashLifes[i].maxLife) {
          activeSplashes = true;
          splashLifes[i].age++;
          
          // Apply velocity and gravity
          positions[i * 3] += splashVelocities[i].x;
          positions[i * 3 + 1] += splashVelocities[i].y;
          positions[i * 3 + 2] += splashVelocities[i].z;
          
          // Slow down drift
          splashVelocities[i].multiplyScalar(0.96);
          
          // Fade color / make smaller
          const lifeRatio = 1.0 - (splashLifes[i].age / splashLifes[i].maxLife);
          colors[i * 3] *= 0.98;
          colors[i * 3 + 1] *= 0.98;
          colors[i * 3 + 2] *= 0.98;
        } else {
          // Hide dead particles
          positions[i * 3] = 999;
          positions[i * 3 + 1] = 999;
          positions[i * 3 + 2] = 999;
        }
      }
      
      if (activeSplashes) {
        splashGeometry.attributes.position.needsUpdate = true;
        splashGeometry.attributes.color.needsUpdate = true;
      }

      // --- 9. Complete Burst Explosion Effect (At exactly 100%) ---
      if (currentProgress >= 100 && !explosionTriggered) {
        explosionTriggered = true;
        // Spawn massive golden/copper active core shockwave splash
        spawnSplash(new THREE.Vector3(0, 0.2, 0), 150, 0xfcd34d);
      }

      renderer.render(scene, camera);
    };
    
    const animationIdRef = requestAnimationFrame(animate);

    // --- 10. Resize Observer ---
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clean up WebGL Context and Listeners on Component Unmount
    return () => {
      cancelAnimationFrame(animationIdRef);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      container.removeEventListener('click', handleCanvasClick);
      
      // Dispose materials & geometries to prevent memory leaks
      bottleGeometry.dispose();
      liquidGeometry.dispose();
      pipetteGeometry.dispose();
      collarGeometry.dispose();
      bulbGeometry.dispose();
      labelGeometry.dispose();
      glowRingGeometry.dispose();
      moleculeGeom.dispose();
      splashGeometry.dispose();
      
      glassMaterial.dispose();
      liquidMaterial.dispose();
      goldMetalMaterial.dispose();
      rubberMaterial.dispose();
      labelMaterial.dispose();
      labelTexture.dispose();
      blueMoleculesMat.dispose();
      goldMoleculesMat.dispose();
      pinkMoleculesMat.dispose();
      splashMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  // Calculate zoom progress for HTML UI elements styling
  const uiZoomProgress = progress >= 50 ? (progress - 50) / 50 : 0;

  const gridStyle = {
    transform: `scale(${1 + uiZoomProgress * 3.5})`,
    opacity: 0.95 * (1 - uiZoomProgress),
    filter: `blur(${uiZoomProgress * 12}px)`,
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out'
  };

  const canvasStyle = {
    transform: `scale(${1 + uiZoomProgress * 0.2})`,
    filter: `blur(${uiZoomProgress > 0.92 ? (uiZoomProgress - 0.92) * 12.5 * 10 : 0}px)`,
    transition: 'transform 0.1s ease-out, filter 0.1s ease-out'
  };

  const headerStyle = {
    transform: `translateY(${-uiZoomProgress * 150}px) scale(${1 - uiZoomProgress * 0.3})`,
    opacity: Math.max(0, 1 - uiZoomProgress * 1.5),
    filter: `blur(${uiZoomProgress * 10}px)`,
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out'
  };

  const hudStyle = {
    transform: `translateY(${uiZoomProgress * 200}px) scale(${1 - uiZoomProgress * 0.2})`,
    opacity: Math.max(0, 1 - uiZoomProgress * 1.6),
    filter: `blur(${uiZoomProgress * 8}px)`,
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out'
  };

  const promptStyle = {
    transform: `translateY(${uiZoomProgress * 120}px)`,
    opacity: Math.max(0, 1 - uiZoomProgress * 2.0),
    filter: `blur(${uiZoomProgress * 6}px)`,
    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out, filter 0.1s ease-out'
  };

  return (
    <div className={`app-loader-container ${isDone ? 'fade-out' : ''}`}>
      {/* Dynamic Interactive WebGL Canvas */}
      <div className="canvas-wrapper" ref={mountRef} style={canvasStyle} />

      {/* Decorative Science Grid Background */}
      <div className="science-grid" style={gridStyle} />
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Premium HUD Information Overlay */}
      <div className="loader-ui-overlay">
        <div className="loader-brand-header" style={headerStyle}>
          <span className="loader-brand-tag">Dermal Formulations</span>
          <h1 className="loader-main-title">N I O D</h1>
        </div>

        <div className="hud-panel" style={hudStyle}>
          <div className="hud-top-row">
            <div className="hud-status-text">
              <span className="status-dot" />
              {progress >= 50 ? 'Initiating Hyper-Zoom Portal...' : 'Initialising Core Protocol'}
            </div>
            <div className="hud-percentage">
              {progress}<span>%</span>
            </div>
          </div>

          <div className="hud-progress-container">
            <div 
              className="hud-progress-bar" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          <div className="hud-bottom-row">
            <span>SYS.VER // CAIS-3</span>
            <span>{progress >= 50 ? 'PORTAL ACTIVE' : 'INT.BOOST ACTIVE'}</span>
          </div>
        </div>

        <span className="click-prompt" style={promptStyle}>Click screen to splash glowing molecules</span>
      </div>
    </div>
  );
};

export default AppLoader;
