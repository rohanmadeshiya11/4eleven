/**
 * Diwali Celebration Festive System — Four Eleven Studio
 * Features:
 * - Click/tap anywhere for golden Diwali sparklers & fireworks (desktop & mobile)
 * - Auto-active through tomorrow (Nov 9, 2026 / expires Nov 10, 2026 00:00:00 IST)
 * - Zero idle CPU usage (requestAnimationFrame pauses automatically when no sparks)
 * - Fully non-blocking (pointer-events: none canvas)
 */

(function () {
  'use strict';

  // Active through tomorrow end-of-day (Nov 9, 2026 IST)
  const DIWALI_EXPIRY = new Date('2026-11-10T00:00:00+05:30');
  if (new Date() > DIWALI_EXPIRY) {
    const hideCapsule = () => {
      const heroCapsule = document.getElementById('diwaliFestiveCapsule');
      if (heroCapsule) heroCapsule.style.display = 'none';
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hideCapsule);
    } else {
      hideCapsule();
    }
    return; // Automatically disable after tomorrow
  }

  // Palette: Golden sparkler, warm saffron flame, vermilion, diamond sparkles
  const COLORS = [
    '#ffd700', // Pure gold
    '#ffec99', // Pale gold sparkle
    '#ffb703', // Warm diya amber
    '#fb8500', // Saffron flame
    '#ff493b', // Studio coral red
    '#ffffff', // Sparkler white-hot
    '#fff3b0'  // Light champagne
  ];

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let dpr = 1;
  const particles = [];
  const rings = [];
  let isAnimating = false;

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

  class Particle {
    constructor(x, y, type = 'spark') {
      this.x = x;
      this.y = y;
      this.prevX = x;
      this.prevY = y;
      this.type = type; // 'spark', 'star', 'ember'

      const angle = Math.random() * Math.PI * 2;
      const speed = type === 'ember' 
        ? Math.random() * 2 + 1 
        : Math.random() * 7 + 2.5;

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      if (type === 'ember') {
        this.vy = -Math.abs(this.vy) * 1.5 - 1; // drift upwards
      }

      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.size = type === 'star' ? Math.random() * 6 + 5 : Math.random() * 3 + 1.8;
      this.gravity = type === 'ember' ? -0.02 : 0.14;
      this.friction = 0.94;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
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
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
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

  class Shockwave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.maxRadius = Math.random() * 25 + 45;
      this.alpha = 0.8;
      this.color = COLORS[Math.floor(Math.random() * 3)];
    }

    update() {
      this.radius += 3.5;
      this.alpha -= 0.045;
      return this.alpha > 0 && this.radius < this.maxRadius;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();
    }
  }

  function spawnBurst(x, y, count = 30) {
    if (!ctx) return;

    // Expanding golden shockwave ring
    rings.push(new Shockwave(x, y));

    // Sparks & stars
    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      let type = 'spark';
      if (typeRand < 0.25) type = 'star';
      else if (typeRand < 0.45) type = 'ember';

      particles.push(new Particle(x, y, type));
    }

    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(loop);
    }
  }

  function loop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Update & draw rings
    for (let i = rings.length - 1; i >= 0; i--) {
      if (rings[i].update()) {
        rings[i].draw(ctx);
      } else {
        rings.splice(i, 1);
      }
    }

    // Update & draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].update()) {
        particles[i].draw(ctx);
      } else {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0 || rings.length > 0) {
      requestAnimationFrame(loop);
    } else {
      isAnimating = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  // Listen for clicks & taps anywhere on the document (desktop + mobile)
  function setupClickEvents() {
    function handlePointer(e) {
      // Don't trigger if user is interacting with video player controls
      if (e.target && (e.target.tagName === 'VIDEO' || e.target.closest('video') || e.target.tagName === 'IFRAME')) {
        return;
      }

      let clientX = e.clientX;
      let clientY = e.clientY;

      if (clientX === undefined && e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      if (clientX !== undefined && clientY !== undefined) {
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
    lamp.title = 'Celebrate Diwali with Four Eleven Studio! ✨ Click for fireworks';
    lamp.innerHTML = `
      <div class="diwali-lamp-bowl">🪔</div>
      <div class="diwali-lamp-label">
        <span class="diwali-lamp-title">Happy Diwali! ✨</span>
        <span class="diwali-lamp-hint">Tap for fireworks</span>
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

      // Fountain of sparks from the lamp
      spawnBurst(originX, originY, 45);

      // Staggered sky bursts
      setTimeout(() => {
        spawnBurst(window.innerWidth * 0.35, window.innerHeight * 0.3, 35);
      }, 180);
      setTimeout(() => {
        spawnBurst(window.innerWidth * 0.65, window.innerHeight * 0.25, 35);
      }, 360);
      setTimeout(() => {
        spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, 40);
      }, 540);
    });

    document.body.appendChild(lamp);
  }

  // Subtle welcome firework burst on initial page arrival
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
