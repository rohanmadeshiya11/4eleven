// 4—11 STUDIO® — 3D Kinetic Canvas & Preloader Architecture
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. ANIMATED PRELOADER (4—11 LOGO & COUNTER)
  // ========================================================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('loader-counter');
  const progressFill = document.getElementById('loader-progress-fill');

  let count = 0;
  const counterInterval = setInterval(() => {
    const increment = Math.floor(Math.random() * 8) + 4;
    count = Math.min(count + increment, 100);
    
    if (counterEl) counterEl.textContent = `${count}%`;
    if (progressFill) progressFill.style.width = `${count}%`;

    if (count >= 100) {
      clearInterval(counterInterval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('loaded');
        }
      }, 350);
    }
  }, 40);

  // ========================================================
  // 2. THREE.JS 3D TORUS KNOT, ORBITING RINGS & EMBER FIELD
  // ========================================================
  const canvas = document.getElementById('webgl-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // A. HERO 3D ELEMENT: Magnificent Kinetic Torus Knot on the Right
    const knotGeom = new THREE.TorusKnotGeometry(4.4, 1.15, 120, 22, 2, 3);
    const knotWire = new THREE.WireframeGeometry(knotGeom);
    
    // Primary white wireframe
    const knotMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.14
    });
    const knotMesh = new THREE.LineSegments(knotWire, knotMat);
    knotMesh.position.set(10.5, 0.5, 0);
    worldGroup.add(knotMesh);

    // Secondary subtle orange accent inner glow
    const knotAccentMat = new THREE.LineBasicMaterial({
      color: 0xff493b,
      transparent: true,
      opacity: 0.08
    });
    const knotAccentMesh = new THREE.LineSegments(knotWire, knotAccentMat);
    knotAccentMesh.scale.set(0.99, 0.99, 0.99);
    knotMesh.add(knotAccentMesh);

    // B. SECOND ELEMENT: Floating Icosahedron with Gyroscope Ring (Top-Left)
    const icoGeom = new THREE.IcosahedronGeometry(2.4, 0);
    const icoWire = new THREE.WireframeGeometry(icoGeom);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.13
    });
    const icoMesh = new THREE.LineSegments(icoWire, icoMat);
    icoMesh.position.set(-11.5, 6.5, -2);
    worldGroup.add(icoMesh);

    // Gyroscope ring around icosahedron
    const ringGeom = new THREE.RingGeometry(3.6, 3.65, 48);
    const ringWire = new THREE.WireframeGeometry(ringGeom);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xff493b,
      transparent: true,
      opacity: 0.18
    });
    const ringMesh = new THREE.LineSegments(ringWire, ringMat);
    icoMesh.add(ringMesh);

    // C. THIRD ELEMENT: Floating Kinetic Stardust Particle Field
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 25;

      // Color mix: subtle fiery orange & pure white
      if (Math.random() > 0.4) {
        colors[i] = 1.0;
        colors[i + 1] = 0.29;
        colors[i + 2] = 0.23; // #ff493b
      } else {
        colors[i] = 0.9;
        colors[i + 1] = 0.9;
        colors[i + 2] = 1.0;
      }
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.55
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    worldGroup.add(particleSystem);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - windowHalfX) * 0.0005;
      mouseY = (e.clientY - windowHalfY) * 0.0005;
    });

    // Render Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth Lerp
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      // Torus Knot dynamic multi-axis rotation
      knotMesh.rotation.x += 0.0016;
      knotMesh.rotation.y += 0.0022;
      knotMesh.rotation.z += 0.0008;

      // Icosahedron & ring counter-rotations
      icoMesh.rotation.x -= 0.002;
      icoMesh.rotation.y += 0.0025;
      ringMesh.rotation.z += 0.004;

      // Particles gentle drift
      particleSystem.rotation.y += 0.0004;

      // Parallax Tilt
      worldGroup.rotation.y = targetX * 1.8;
      worldGroup.rotation.x = targetY * 1.8;

      renderer.render(scene, camera);
    }
    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ========================================================
  // 3. MENU DRAWER & MODAL INTERACTIONS
  // ========================================================
  const menuBtn = document.getElementById('menu-btn');
  const menuDrawer = document.getElementById('menu-drawer');
  const drawerClose = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (menuDrawer) menuDrawer.classList.add('open');
  }
  function closeDrawer() {
    if (menuDrawer) menuDrawer.classList.remove('open');
  }
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  // Modals
  const servicesModal = document.getElementById('services-modal');
  const workModal = document.getElementById('work-modal');
  const whatWeDoBtn = document.getElementById('what-we-do-btn');
  const viewWorksBtn = document.getElementById('view-works-btn');
  const scrollBadgeBtn = document.getElementById('scroll-badge-btn');

  function openModal(modal) {
    if (modal) modal.classList.add('open');
  }
  function closeModal(modal) {
    if (modal) modal.classList.remove('open');
  }

  if (whatWeDoBtn) {
    whatWeDoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(servicesModal);
    });
  }

  if (viewWorksBtn) {
    viewWorksBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(workModal);
    });
  }

  if (scrollBadgeBtn) {
    scrollBadgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(servicesModal);
    });
  }

  // Close buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Backdrop click close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (servicesModal) closeModal(servicesModal);
      if (workModal) closeModal(workModal);
    }
  });

  // Drawer Nav Links
  document.querySelectorAll('.drawer-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const target = item.getAttribute('data-target');
      if (target === 'services') {
        closeDrawer();
        openModal(servicesModal);
      } else if (target === 'work') {
        closeDrawer();
        openModal(workModal);
      }
    });
  });
});
