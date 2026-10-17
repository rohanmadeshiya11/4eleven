// 4—11 STUDIO® — Interactive Three.js 3D Wireframe Background & Preloader
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. PRELOADER ANIMATION (4—11 LOGO & COUNTER)
  // ========================================================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('loader-counter');
  const progressFill = document.getElementById('loader-progress-fill');

  let count = 0;
  const counterInterval = setInterval(() => {
    // Accelerate smoothly to 100
    const increment = Math.floor(Math.random() * 8) + 3;
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
  }, 45);

  // ========================================================
  // 2. THREE.JS 3D WIREFRAME DODECAHEDRONS (HLF REFERENCE)
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

    // Create Wireframe Polyhedron Helper
    function createWireframePolyhedron(radius, color, opacity) {
      const geometry = new THREE.DodecahedronGeometry(radius, 0);
      const wireframe = new THREE.WireframeGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        linewidth: 1
      });
      return new THREE.LineSegments(wireframe, material);
    }

    // 1. Top-Left Medium Dodecahedron
    const meshTopLeft = createWireframePolyhedron(3.2, 0xffffff, 0.12);
    meshTopLeft.position.set(-11, 6.5, -2);
    scene.add(meshTopLeft);

    // 2. Giant Right Dodecahedron (Matches Screenshot)
    const meshRightLarge = createWireframePolyhedron(7.5, 0xffffff, 0.15);
    meshRightLarge.position.set(10.5, 1.5, 0);
    scene.add(meshRightLarge);

    // 3. Subtle Bottom-Center Dodecahedron
    const meshBottom = createWireframePolyhedron(2.8, 0xffffff, 0.08);
    meshBottom.position.set(2.5, -8.5, -4);
    scene.add(meshBottom);

    // Mouse Parallax Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - windowHalfX) * 0.0006;
      mouseY = (e.clientY - windowHalfY) * 0.0006;
    });

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);

      // Smooth Lerp for Parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Constant Majestic Rotation
      meshTopLeft.rotation.x += 0.0018;
      meshTopLeft.rotation.y += 0.0022;

      meshRightLarge.rotation.x += 0.0012;
      meshRightLarge.rotation.y += 0.0016;

      meshBottom.rotation.x -= 0.0015;
      meshBottom.rotation.z += 0.002;

      // Apply Parallax Tilt
      scene.rotation.y = targetX * 1.5;
      scene.rotation.x = targetY * 1.5;

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
  // 3. MENU DRAWER & MODAL CONTROLS
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

  // Close buttons for modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // ESC key to close any drawer or modal
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
