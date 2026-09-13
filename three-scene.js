import * as THREE from 'three';

/**
 * Champ de particules discret dans le hero — évoque la lumière d'une salle
 * chaleureuse (braises, poussière dorée). Amélioration progressive pure :
 * si WebGL est indisponible ou que l'utilisateur préfère moins d'animation,
 * on ne touche à rien et le hero garde son fond photo + dégradé habituel.
 */
(function initHeroParticles() {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var canvas = document.getElementById('heroCanvas');
  var hero = document.getElementById('accueil');
  if (!canvas || !hero) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
  } catch (err) {
    return; // WebGL unavailable — the static hero background stays as-is.
  }

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 12;

  function makeGlowTexture() {
    var size = 64;
    var c = document.createElement('canvas');
    c.width = c.height = size;
    var ctx = c.getContext('2d');
    var gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255, 225, 180, 0.9)');
    gradient.addColorStop(0.4, 'rgba(230, 170, 110, 0.5)');
    gradient.addColorStop(1, 'rgba(230, 170, 110, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    var tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  var PARTICLE_COUNT = 160;
  var positions = new Float32Array(PARTICLE_COUNT * 3);
  var speeds = new Float32Array(PARTICLE_COUNT);
  var sways = new Float32Array(PARTICLE_COUNT);

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    speeds[i] = 0.15 + Math.random() * 0.25;
    sways[i] = Math.random() * Math.PI * 2;
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var material = new THREE.PointsMaterial({
    size: 0.22,
    map: makeGlowTexture(),
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  var points = new THREE.Points(geometry, material);
  scene.add(points);

  function resize() {
    var rect = hero.getBoundingClientRect();
    var width = rect.width;
    var height = rect.height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  var isVisible = true;
  if ('IntersectionObserver' in window) {
    var visibilityObserver = new IntersectionObserver(
      function (entries) {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(hero);
  }

  var isTabVisible = !document.hidden;
  document.addEventListener('visibilitychange', function () {
    isTabVisible = !document.hidden;
  });

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible || !isTabVisible) return;

    var elapsed = clock.getElapsedTime();
    var pos = geometry.attributes.position;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      var idx = i * 3;
      pos.array[idx + 1] += speeds[i] * 0.01;
      pos.array[idx] += Math.sin(elapsed * 0.4 + sways[i]) * 0.002;

      if (pos.array[idx + 1] > 7) {
        pos.array[idx + 1] = -7;
      }
    }
    pos.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();
