import * as THREE from "three";

THREE.ColorManagement.enabled = false;

/* ------------------------------------------------------------------
   Hero portrait scene
   A single transparent plane. The portrait burns in from darkness,
   then lives behind a liquid holographic cursor reveal. Depth is read
   from the generated map for parallax and relighting.
------------------------------------------------------------------- */

const VERT = /* glsl */ `
  uniform sampler2D uDepth;
  uniform vec2 uPointer;
  uniform float uDepthScale;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    float depth = texture2D(uDepth, uv).r;
    depth = smoothstep(0.02, 0.98, depth);
    vDepth = depth;
    vUv = uv + (uPointer * 0.5) * (depth - 0.5) * 0.014;
    vec3 p = position;
    p.z += (depth - 0.5) * uDepthScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D uMap;
  uniform sampler2D uDepth;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uIntro;
  uniform float uTrailStrength;
  uniform vec2 uTrail[24];
  uniform float uAspect;
  uniform float uRevealRadius;
  varying vec2 vUv;
  varying float vDepth;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.00001), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    vec4 tex = texture2D(uMap, vUv);
    if (tex.a < 0.014) discard;

    float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
    vec3 col = tex.rgb;

    /* cinematic grade — cool shadows, warm skin, acid rim */
    col = pow(col, vec3(0.96));
    col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.9);
    col *= mix(vec3(0.88, 0.95, 0.93), vec3(1.035, 1.01, 0.975), smoothstep(0.12, 0.9, luma));

    /* depth-derived relight toward the cursor */
    float d = texture2D(uDepth, vUv).r;
    float dx = texture2D(uDepth, vUv + vec2(0.004, 0.0)).r - d;
    float dy = texture2D(uDepth, vUv + vec2(0.0, 0.004)).r - d;
    vec3 normal = normalize(vec3(-dx * 7.0, -dy * 7.0, 1.0));
    vec3 light = normalize(vec3(uPointer.x * 0.85, uPointer.y * 0.85, 1.0));
    float diff = max(dot(normal, light), 0.0);
    col += vec3(0.42, 0.58, 0.34) * diff * 0.16;

    /* rim light around the cutout */
    float rim = smoothstep(0.58, 0.0, tex.a);
    col = mix(col, vec3(0.62, 0.98, 0.38), rim * 0.18);

    /* fine scan texture */
    float scan = sin((vUv.y + uTime * 0.018) * 980.0) * 0.5 + 0.5;
    col *= 0.986 + scan * 0.014;

    /* burn-in front, crown to chin */
    float wobble = (hash(floor(vUv * vec2(64.0, 110.0))) - 0.5) * 0.03;
    float introEase = smoothstep(0.0, 1.0, uIntro);
    float front = mix(1.14, -0.14, introEase);
    float y = vUv.y + wobble;
    float reveal = smoothstep(front - 0.035, front + 0.035, y);

    vec3 shell = col * 0.26;
    shell = mix(shell, vec3(0.018, 0.045, 0.03), 0.26);
    float grid = step(0.93, fract(vUv.x * 38.0)) + step(0.945, fract(vUv.y * 56.0));
    shell += vec3(0.16, 0.4, 0.07) * grid * 0.2;
    vec3 finalCol = mix(shell, col, reveal);

    float edge = exp(-pow((y - front) / 0.028, 2.0)) * (1.0 - smoothstep(0.96, 1.0, uIntro));
    finalCol += vec3(0.66, 1.0, 0.22) * edge * 1.8;

    /* a slow scanning band after the burn */
    float wave = exp(-pow(fract(vUv.y - uTime * 0.095) - 0.5, 2.0) * 72.0) * 0.045;
    finalCol += vec3(0.55, 1.0, 0.18) * wave;

    /* liquid holographic cursor reveal */
    float trail = 0.0;
    vec2 point = vec2(vUv.x * uAspect, vUv.y);
    point += vec2(sin(vUv.y * 34.0 + uTime * 1.8), cos(vUv.x * 28.0 - uTime * 1.4)) * 0.0025;
    for (int i = 0; i < 23; i++) {
      vec2 a = vec2(uTrail[i].x * uAspect, uTrail[i].y);
      vec2 b = vec2(uTrail[i + 1].x * uAspect, uTrail[i + 1].y);
      if (uTrail[i].x < -2.0 || uTrail[i + 1].x < -2.0) continue;
      trail = max(trail, smoothstep(uRevealRadius, uRevealRadius * 0.18, sdSegment(point, a, b)));
    }
    trail *= uTrailStrength;

    vec3 holo = col * 1.12 + vec3(0.1, 0.22, 0.16) * luma;
    holo = mix(holo, vec3(luma) * vec3(0.86, 1.18, 1.0), 0.35);
    holo += vec3(0.32, 0.82, 0.5) * scan * 0.06;
    float chroma = 0.0024;
    vec3 shifted = vec3(
      texture2D(uMap, vUv + vec2(chroma, 0.0)).r,
      texture2D(uMap, vUv).g,
      texture2D(uMap, vUv - vec2(chroma, 0.0)).b
    );
    holo = mix(holo, shifted * 1.05, 0.24);
    finalCol = mix(finalCol, holo, trail * 0.45);
    float holoEdge = smoothstep(0.02, 0.14, trail) * (1.0 - smoothstep(0.58, 0.97, trail));
    finalCol += vec3(0.58, 1.0, 0.78) * holoEdge * 0.26;

    /* vignette + grain */
    vec2 uv2 = vUv - 0.5;
    float vig = smoothstep(0.92, 0.2, length(uv2 * vec2(1.1, 1.0)));
    finalCol *= 0.72 + 0.28 * vig;
    finalCol += (hash(vUv * vec2(1440.0, 1800.0) + uTime) - 0.5) * 0.032;

    float alpha = tex.a * mix(0.3 + reveal * 0.7, 1.0, min(1.0, trail * 0.5));
    gl_FragColor = vec4(finalCol, alpha);
  }
`;

function loadTexture(loader, url, isColor = false) {
  return loader.loadAsync(url).then((texture) => {
    texture.colorSpace = THREE.NoColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  });
}

export async function initHeroScene({ canvas, stage, reducedMotion = false }) {
  if (!canvas || !stage || reducedMotion) return null;
  const probe = document.createElement("canvas");
  const probeGl = probe.getContext("webgl2") || probe.getContext("webgl");
  if (!probeGl) return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });
  } catch (error) {
    console.warn("WebGL could not be created", error);
    return null;
  }

  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const mobile = window.innerWidth < 768 || (coarse && window.innerWidth < 1024);
  const maxDpr = mobile ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(maxDpr, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
  camera.position.set(0, 0, 4.2);
  camera.lookAt(0, 0, 0);

  const textureLoader = new THREE.TextureLoader();
  const base = new URL("../assets/img/portrait.webp", import.meta.url).href;
  const depthUrl = new URL("../assets/img/portrait-depth.webp", import.meta.url).href;
  const [portrait, depth] = await Promise.all([
    loadTexture(textureLoader, base, true),
    loadTexture(textureLoader, depthUrl, false),
  ]);
  portrait.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const trail = Array.from({ length: 24 }, () => new THREE.Vector2(-10, -10));
  const uniforms = {
    uMap: { value: portrait },
    uDepth: { value: depth },
    uPointer: { value: new THREE.Vector2(0, 0.2) },
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uTrailStrength: { value: 0 },
    uTrail: { value: trail },
    uAspect: { value: 1 },
    uRevealRadius: { value: 0.16 },
    uDepthScale: { value: 0.1 },
  };

  const geometry = new THREE.PlaneGeometry(1, 1, mobile ? 64 : 100, mobile ? 88 : 132);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    premultipliedAlpha: false,
    side: THREE.FrontSide,
  });
  const group = new THREE.Group();
  const plane = new THREE.Mesh(geometry, material);
  plane.renderOrder = 3;
  group.add(plane);

  /* orbit rings behind the cutout */
  const rings = [];
  const makeRing = (radius, opacity, tilt) => {
    const points = [];
    const segments = 190;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0xc6ff3d,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geo, mat);
    line.rotation.set(tilt, tilt * 0.55, 0);
    line.position.z = -0.32;
    line.renderOrder = 1;
    group.add(line);
    rings.push(line);
    return line;
  };
  makeRing(0.58, 0.2, 0.16);
  makeRing(0.68, 0.1, -0.2);
  makeRing(0.5, 0.16, 0.06);

  /* a sparse data constellation behind the head */
  const pointCount = mobile ? 55 : 95;
  const positions = new Float32Array(pointCount * 3);
  for (let i = 0; i < pointCount; i++) {
    const angle = i * 2.399963;
    const radius = 0.42 + (i / pointCount) * 0.28;
    positions[i * 3] = Math.cos(angle) * radius * (0.8 + (i % 5) * 0.06);
    positions[i * 3 + 1] = Math.sin(angle) * radius * (0.58 + (i % 3) * 0.04);
    positions[i * 3 + 2] = -0.25 - ((i * 0.137) % 0.3);
  }
  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pointMat = new THREE.PointsMaterial({
    color: 0xc6ff3d,
    size: 0.005,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(pointGeo, pointMat);
  points.renderOrder = 0;
  group.add(points);

  scene.add(group);

  let width = 0;
  let height = 0;
  let visible = true;
  let begun = false;
  let beginAt = 0;
  let lastTrailAt = 0;
  let trailStrength = 0;
  let lastPoint = new THREE.Vector2(-10, -10);
  let pointerTarget = new THREE.Vector2(0, 0.1);
  const pointerSmooth = new THREE.Vector2(0, 0.1);
  let lastFrame = 0;
  let raf = 0;
  let introDone = false;

  const fit = () => {
    const rect = stage.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const dist = camera.position.z;
    const visibleH = 2 * dist * Math.tan((camera.fov * Math.PI) / 360);
    const planeH = visibleH * 0.985;
    const planeW = planeH * (width / height);
    group.scale.set(planeW, planeH, 1);
    uniforms.uAspect.value = width / height;
    uniforms.uRevealRadius.value = width < 520 ? 0.14 : 0.088;
  };
  fit();

  const resizeObserver = new ResizeObserver(() => fit());
  resizeObserver.observe(stage);

  const pushPoint = (x, y) => {
    if (x < -0.25 || x > 1.25 || y < -0.25 || y > 1.25) return;
    const dx = x - lastPoint.x;
    const dy = y - lastPoint.y;
    if (dx * dx + dy * dy < 0.000008) return;
    lastPoint.set(x, y);
    for (let i = trail.length - 1; i > 0; i--) trail[i].copy(trail[i - 1]);
    trail[0].set(x, y);
    lastTrailAt = performance.now();
  };

  const onPointerMove = (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    pointerTarget.set((event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1);
    if (!coarse && x > -0.2 && x < 1.2 && y > -0.2 && y < 1.2) pushPoint(x, y);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const render = (now) => {
    raf = requestAnimationFrame(render);
    if (!visible || document.hidden) return;
    if (window.scrollY > window.innerHeight * 1.35) return;
    const interval = mobile ? 1000 / 30 - 2 : 0;
    if (interval && now - lastFrame < interval) return;
    lastFrame = now;

    const introRaw = begun ? Math.min(1, (now - beginAt) / 3600) : 0;
    const intro = introRaw * introRaw * (3 - 2 * introRaw);
    uniforms.uIntro.value = intro;
    uniforms.uTime.value = now / 1000;

    if (begun && introRaw >= 1) introDone = true;

    const idle = now - lastTrailAt;
    const targetStrength = idle < 100 ? 1 : 0;
    trailStrength = lerp(trailStrength, targetStrength, 0.055);
    uniforms.uTrailStrength.value = trailStrength;
    pointerSmooth.lerp(pointerTarget, mobile ? 0.08 : 0.06);
    uniforms.uPointer.value.set(pointerSmooth.x, -pointerSmooth.y);
    group.rotation.y = pointerSmooth.x * 0.065;
    group.rotation.x = pointerSmooth.y * 0.035;
    group.position.x = pointerSmooth.x * 0.012;
    group.position.y = -pointerSmooth.y * 0.008;

    rings[0].rotation.z += 0.0007;
    rings[1].rotation.z -= 0.0005;
    rings[2].rotation.z += 0.0003;
    points.rotation.z += 0.00008;

    renderer.render(scene, camera);
  };

  const onVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);
  new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
  }, { rootMargin: "5% 0% 5% 0%" }).observe(stage);

  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    document.body.classList.remove("scene-ready");
  });

  try {
    if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
    else renderer.compile(scene, camera);
    renderer.render(scene, camera);
  } catch (error) {
    console.warn("Hero scene compile warning", error);
  }

  const lerp = (a, b, t) => a + (b - a) * t;

  const begin = () => {
    if (begun) return;
    begun = true;
    beginAt = performance.now();
    if (renderer.getContext()) render(performance.now());
  };

  render(performance.now());

  return {
    begin,
    destroy() {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      portrait.dispose();
      depth.dispose();
      renderer.dispose();
    },
    get isReady() {
      return true;
    },
  };
}
