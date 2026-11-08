/**
 * Diwali Celebration Festive System — Four Eleven Studio
 * Features:
 * - Auto-loop soaring Diwali rockets launching into night sky & exploding into fireworks
 * - Click/tap anywhere for golden Diwali sparklers & fireworks (desktop & mobile)
 * - Interactive floating Diya widget with multi-rocket celebratory launch
 * - Auto-active through tomorrow (Nov 9, 2026 / expires Nov 10, 2026 00:00:00 IST)
 * - Non-blocking pointer-events: none canvas & 0% idle CPU when stationary
 */

(function () {
  'use strict';

  // Active through tomorrow end-of-day (Nov 9, 2026 IST)
  const DIWALI_EXPIRY = new Date('2026-11-10T00:00:00+05:30');
  if (new Date() > DIWALI_EXPIRY) {
    const hideCapsule = () => {
      const heroCapsule = document.getElementById('diwaliFestiveCapsule');
      if (heroCapsule) heroCapsule.style.display = 'none';
      const lamp = document.getElementById('diwaliFloatingLamp');
      if (lamp) lamp.style.display = 'none';
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideCapsule);
    } else {
      hideCapsule();
    }
    return; // Automatically disable after tomorrow
  }

  // Festive color palettes for explosions & rockets
  const ROCKET_PALETTES = [
    ['#ffd700', '#ffec99', '#ffb703', '#ffffff', '#ffe169'], // Pure Shubh Gold
    ['#ff493b', '#ff7b00', '#ffbe0b', '#ffffff', '#ffd166'], // Saffron & Coral Flame
    ['#c77dff', '#9d4edd', '#ffd700', '#ffffff', '#e0aaff'], // Royal Amethyst & Gold
    ['#06d6a0', '#2ec4b6', '#ffd700', '#ffffff', '#52b788'], // Emerald Sparkle
    ['#e63946', '#ff493b', '#ffd700', '#ffffff', '#ff99c8']  // Ruby Festival
  ];

  const DEFAULT_COLORS = [
    '#ffd700', '#ffec99', '#ffb703', '#fb8500', '#ff493b', '#ffffff', '#fff3b0'
  ];

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let dpr = 1;
  const particles = [];
  const rings = [];
  const rockets = [];
  const trailSparks = [];
  let isAnimating = false;
  let rocketLoopTimeout = null;

  function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'diwaliCanvas';
    ctx = canvas.getContext('2d', { alpha: true });
    document.body.appendChild(canvas);

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  // Draw 4-point Diwali star sparkle
  function drawStar(ctx, x, y, spikes, outerRadius, innerRadius, color, alpha, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      let cx = Math.cos(rot) * outerRadius;
      let cy = Math.sin(rot) * outerRadius;
      ctx.lineTo(cx, cy);
      rot += step;

      cx = Math.cos(rot) * innerRadius;
      cy = Math.sin(rot) * innerRadius;
      ctx.lineTo(cx, cy);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  // Sparkler trail particle emitted by climbing rockets
  class RocketTrailSpark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.6;
      this.vy = Math.random() * 2.8 + 1.2; // falls down with gravity
      this.color = color;
      this.alpha = 1;
      this.decay = Math.random() * 0.05 + 0.04;
      this.size = Math.random() * 2.2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12; // gravity
      this.alpha -= this.decay;
      this.size *= 0.95;
      return this.alpha > 0 && this.size > 0.3;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Soaring Diwali Rocket
  class Rocket {
    constructor(startX, targetX, targetY, palette) {
      this.x = startX;
      this.y = height + 10;
      this.prevX = this.x;
      this.prevY = this.y;
      this.targetX = targetX;
      this.targetY = targetY;

      // Flight time in frames (40-60 frames ≈ 0.7 - 1.0s)
      this.totalFrames = Math.floor(Math.random() * 16 + 42);
      this.currentFrame = 0;

      const dx = targetX - startX;
      const dy = targetY - (height + 10);
      this.vx = dx / this.totalFrames;
      this.vy = dy / this.totalFrames;

      this.palette = palette || ROCKET_PALETTES[Math.floor(Math.random() * ROCKET_PALETTES.length)];
      this.trailColor = this.palette[0];
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.currentFrame++;

      // Natural rocket physics: fast climb with slight deceleration near apex
      const progress = this.currentFrame / this.totalFrames;
      const speedFactor = 1.35 - (progress * 0.7);
      this.x += this.vx * speedFactor;
      this.y += this.vy * speedFactor;

      // Emit fiery golden/sparkler trail sparks
      const sparkCount = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < sparkCount; i++) {
        const sparkColor = (Math.random() < 0.4) ? '#ffffff' : this.palette[Math.floor(Math.random() * this.palette.length)];
        trailSparks.push(new RocketTrailSpark(
          this.x + (Math.random() - 0.5) * 3,
          this.y + (Math.random() * 5),
          sparkColor
        ));
      }

      // Check if rocket reached apex or completed trajectory
      if (this.currentFrame >= this.totalFrames || this.y <= this.targetY) {
        this.explode();
        return false;
      }
      return true;
    }

    draw(ctx) {
      ctx.save();
      // Glowing ascent streak
      ctx.beginPath();
      ctx.moveTo(this.prevX, this.prevY);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.trailColor;
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.shadowColor = this.trailColor;
      ctx.shadowBlur = 10;
      ctx.stroke();

      // Bright incandescent rocket tip
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fff3b0';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.restore();
    }

    explode() {
      spawnBurst(this.x, this.y, Math.floor(Math.random() * 16 + 48), this.palette);
    }
  }

  // Particle for firework burst (spark, star, or drifting ember)
  class Particle {
    constructor(x, y, type = 'spark', customPalette = null) {
      this.x = x;
      this.y = y;
      this.prevX = x;
      this.prevY = y;
      this.type = type; // 'spark', 'star', 'ember'

      const palette = customPalette || DEFAULT_COLORS;
      const angle = Math.random() * Math.PI * 2;
      const speed = type === 'ember' 
        ? Math.random() * 2.2 + 0.8 
        : Math.random() * 7.5 + 2.5;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      if (type === 'ember') {
        this.vy = -Math.abs(this.vy) * 1.5 - 0.8; // drift upwards
      }

      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.014;
      this.size = type === 'star' ? Math.random() * 6.5 + 5 : Math.random() * 3 + 1.8;
      this.gravity = type === 'ember' ? -0.018 : 0.13;
      this.friction = 0.94;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.22;
      this.wobble = Math.random() * Math.PI * 2;
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;

      this.vx *= this.friction;
      this.vy = this.vy * this.friction + this.gravity;

      if (this.type === 'ember') {
        this.wobble += 0.1;
        this.x += Math.sin(this.wobble) * 0.8;
      }

      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.size *= 0.985;
      this.rot += this.rotSpeed;

      return this.alpha > 0 && this.size > 0.4;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;

      if (this.type === 'star') {
        drawStar(ctx, this.x, this.y, 4, this.size, this.size * 0.35, this.color, this.alpha, this.rot);
        return;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;

      if (this.type === 'spark') {
        // Streaking sparkler spark line
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(1, this.size * 0.8);
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // White-hot center dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Floating ember dot
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Shockwave radial ring on explosion
  class Shockwave {
    constructor(x, y, ringColor = null) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.maxRadius = Math.random() * 26 + 48;
      this.alpha = 0.85;
      this.color = ringColor || DEFAULT_COLORS[Math.floor(Math.random() * 3)];
    }

    update() {
      this.radius += 3.6;
      this.alpha -= 0.042;
      return this.alpha > 0 && this.radius < this.maxRadius;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();
    }
  }

  // Spawn firework explosion at coordinates
  function spawnBurst(x, y, count = 30, customPalette = null) {
    if (!ctx) return;

    const palette = customPalette || DEFAULT_COLORS;

    // Expanding shockwave ring
    rings.push(new Shockwave(x, y, palette[0]));

    // Sparks, stars, and embers
    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type = 'spark';
      if (typeRand < 0.28) type = 'star';
      else if (typeRand < 0.48) type = 'ember';

      particles.push(new Particle(x, y, type, palette));
    }

    startAnimationLoop();
  }

  // Launch a soaring rocket towards target apex
  function launchRocket(customStartX = null, customTargetX = null, customTargetY = null, palette = null) {
    if (!ctx) return;
    const startX = customStartX !== null ? customStartX : Math.random() * (width * 0.7) + (width * 0.15);
    const targetX = customTargetX !== null ? customTargetX : startX + (Math.random() - 0.5) * 150;
    const targetY = customTargetY !== null ? customTargetY : Math.random() * (height * 0.32) + (height * 0.12);

    const selectedPalette = palette || ROCKET_PALETTES[Math.floor(Math.random() * ROCKET_PALETTES.length)];
    rockets.push(new Rocket(startX, targetX, targetY, selectedPalette));

    startAnimationLoop();
  }

  function startAnimationLoop() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(loop);
    }
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // 1. Update & draw shockwave rings
    for (let i = rings.length - 1; i >= 0; i--) {
      if (rings[i].update()) {
        rings[i].draw(ctx);
      } else {
        rings.splice(i, 1);
      }
    }

    // 2. Update & draw rocket trail sparks
    for (let i = trailSparks.length - 1; i >= 0; i--) {
      if (trailSparks[i].update()) {
        trailSparks[i].draw(ctx);
      } else {
        trailSparks.splice(i, 1);
      }
    }

    // 3. Update & draw soaring rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      if (rockets[i].update()) {
        rockets[i].draw(ctx);
      } else {
        rockets.splice(i, 1);
      }
    }

    // 4. Update & draw burst particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].update()) {
        particles[i].draw(ctx);
      } else {
        particles.splice(i, 1);
      }
    }

    // Check if still active
    if (particles.length > 0 || rings.length > 0 || rockets.length > 0 || trailSparks.length > 0) {
      requestAnimationFrame(loop);
    } else {
      isAnimating = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  // Automatic Looping Diwali Rockets Scheduler
  function triggerAutoRocket() {
    if (document.hidden) return; // Don't fire if user is away on another tab

    launchRocket();

    // 35% chance of launching a staggered twin rocket volley!
    if (Math.random() < 0.35) {
      setTimeout(() => {
        if (!document.hidden) {
          launchRocket();
        }
      }, 380);
    }
  }

  function scheduleNextAutoRocket() {
    if (rocketLoopTimeout) clearTimeout(rocketLoopTimeout);

    // Natural random loop interval between 3.5s and 6.0s
    const delay = Math.random() * 2500 + 3500;
    rocketLoopTimeout = setTimeout(() => {
      triggerAutoRocket();
      scheduleNextAutoRocket();
    }, delay);
  }

  function startAutoRocketLoop() {
    // Start first rocket after 2.4 seconds (after initial welcome sky burst)
    rocketLoopTimeout = setTimeout(() => {
      triggerAutoRocket();
      scheduleNextAutoRocket();
    }, 2400);

    // Handle tab visibility changes to preserve battery and avoid pileup
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rocketLoopTimeout) clearTimeout(rocketLoopTimeout);
      } else {
        scheduleNextAutoRocket();
      }
    });
  }

  // Listen for clicks & taps anywhere on the document (desktop + mobile)
  function setupClickEvents() {
    function handlePointer(e) {
      // Don't trigger if user is interacting with video player controls or form fields
      if (e.target && (e.target.tagName === 'VIDEO' || e.target.closest('video') || e.target.tagName === 'IFRAME' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }

      let clientX = e.clientX;
      let clientY = e.clientY;

      if (clientX === undefined && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      if (clientX !== undefined && clientY !== undefined) {
        // Tap creates sparkler burst directly at finger/cursor
        spawnBurst(clientX, clientY, 26);
      }
    }

    window.addEventListener('pointerdown', handlePointer, { passive: true });
  }

  // Floating Diya celebratory widget (bottom-left)
  function setupFloatingLamp() {
    const lamp = document.createElement('div');
    lamp.className = 'diwali-floating-lamp';
    lamp.id = 'diwaliFloatingLamp';
    lamp.title = 'Celebrate Diwali with Four Eleven Studio! ✨ Click for rocket fireworks';
    lamp.innerHTML = `
      <div class="diwali-lamp-bowl">🪔</div>
      <div class="diwali-lamp-label">
        <span class="diwali-lamp-title">Happy Diwali! ✨</span>
        <span class="diwali-lamp-hint">Tap for rockets</span>
      </div>
    `;

    lamp.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navigator.vibrate) {
        try { navigator.vibrate([20, 30, 20]); } catch (_) {}
      }

      const rect = lamp.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top;

      // 1. Fountain of golden sparks from the diya
      spawnBurst(originX, originY, 40);

      // 2. Launch celebratory rockets up from the lamp into the night sky!
      setTimeout(() => {
        launchRocket(originX, window.innerWidth * 0.32, window.innerHeight * 0.24);
      }, 150);

      setTimeout(() => {
        launchRocket(originX, window.innerWidth * 0.68, window.innerHeight * 0.28);
      }, 420);

      setTimeout(() => {
        launchRocket(originX, window.innerWidth * 0.5, window.innerHeight * 0.18);
      }, 720);
    });

    document.body.appendChild(lamp);
  }

  // Welcome firework bursts on initial page arrival
  function welcomeBursts() {
    setTimeout(() => {
      spawnBurst(window.innerWidth * 0.3, window.innerHeight * 0.22, 28);
    }, 700);
    setTimeout(() => {
      spawnBurst(window.innerWidth * 0.7, window.innerHeight * 0.28, 28);
    }, 1200);
  }

  // Initialize once DOM is ready
  function init() {
    initCanvas();
    setupClickEvents();
    setupFloatingLamp();
    welcomeBursts();
    startAutoRocketLoop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
