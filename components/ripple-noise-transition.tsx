"use client";

import { useEffect, useRef, useState } from "react";
import { folder, Leva, useControls } from "leva";
import * as THREE from "three/webgpu";
import {
  abs,
  clamp,
  length,
  mix,
  mx_noise_float,
  oneMinus,
  pow,
  sin,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  vec4,
} from "three/tsl";

type TransitionSettings = {
  progress: number;
  progressAmplify: number;
  frontOffset: number;
  time: number;
  noiseScale: number;
  noiseStrength: number;
  distortionMix: number;
  rippleFrequency: number;
  rippleAmplitude: number;
  rippleBandWidth: number;
  rippleBandHardness: number;
  rippleTimeSpeed: number;
  rippleEdgeBoost: number;
  edgeSoftness: number;
  edgeHardness: number;
  coreRadius: number;
  coreFeather: number;
  coreDistort: number;
  coreDarkness: number;
  ringOffset: number;
  ringWidth: number;
  glowStrength: number;
  glowWidth: number;
  normalStrength: number;
  normalScale: number;
  normalDrift: number;
};

const DEFAULT_SETTINGS: TransitionSettings = {
  progress: 0,
  progressAmplify: 1.35,
  frontOffset: -0.2,
  time: 0,
  noiseScale: 6.0,
  noiseStrength: 0.09,
  distortionMix: 0.2,
  rippleFrequency: 42.0,
  rippleAmplitude: 0.04,
  rippleBandWidth: 0.28,
  rippleBandHardness: 1.0,
  rippleTimeSpeed: 9.5,
  rippleEdgeBoost: 1.4,
  edgeSoftness: 0.08,
  edgeHardness: 1.0,
  coreRadius: 0.24,
  coreFeather: 0.08,
  coreDistort: 0.08,
  coreDarkness: 0.92,
  ringOffset: 0.05,
  ringWidth: 0.35,
  glowStrength: 0.3,
  glowWidth: 0.03,
  normalStrength: 0.03,
  normalScale: 1.4,
  normalDrift: 0.03,
};

interface RippleNoiseTransitionProps {
  imageA?: string;
  imageB?: string;
  normalMap?: string;
}

export default function RippleNoiseTransition({
  imageA = "/component-references/race.png",
  imageB = "/component-references/card-a.png",
  normalMap = "/mud_normal.jpeg",
}: RippleNoiseTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const settings = useControls("Ripple Transition", {
    Transition: folder(
      {
        progress: { value: DEFAULT_SETTINGS.progress, min: 0, max: 1, step: 0.001 },
        progressAmplify: { value: DEFAULT_SETTINGS.progressAmplify, min: 0.6, max: 3.5, step: 0.01 },
        frontOffset: { value: DEFAULT_SETTINGS.frontOffset, min: -0.6, max: 0.4, step: 0.01 },
        edgeSoftness: { value: DEFAULT_SETTINGS.edgeSoftness, min: 0.01, max: 0.25, step: 0.005 },
        edgeHardness: { value: DEFAULT_SETTINGS.edgeHardness, min: 0.4, max: 4, step: 0.05 },
        time: { value: DEFAULT_SETTINGS.time, min: 0, max: 20, step: 0.01 },
      },
      { collapsed: false }
    ),
    Ripple: folder(
      {
        rippleFrequency: { value: DEFAULT_SETTINGS.rippleFrequency, min: 10, max: 80, step: 1 },
        rippleAmplitude: { value: DEFAULT_SETTINGS.rippleAmplitude, min: 0, max: 0.12, step: 0.002 },
        rippleBandWidth: { value: DEFAULT_SETTINGS.rippleBandWidth, min: 0.05, max: 0.6, step: 0.01 },
        rippleBandHardness: { value: DEFAULT_SETTINGS.rippleBandHardness, min: 0.4, max: 4, step: 0.05 },
        rippleTimeSpeed: { value: DEFAULT_SETTINGS.rippleTimeSpeed, min: 0, max: 20, step: 0.1 },
        rippleEdgeBoost: { value: DEFAULT_SETTINGS.rippleEdgeBoost, min: 0, max: 3, step: 0.05 },
      },
      { collapsed: true }
    ),
    Core: folder(
      {
        coreRadius: { value: DEFAULT_SETTINGS.coreRadius, min: 0.05, max: 0.45, step: 0.005 },
        coreFeather: { value: DEFAULT_SETTINGS.coreFeather, min: 0.01, max: 0.2, step: 0.005 },
        coreDistort: { value: DEFAULT_SETTINGS.coreDistort, min: 0, max: 0.2, step: 0.002 },
        coreDarkness: { value: DEFAULT_SETTINGS.coreDarkness, min: 0, max: 1, step: 0.01 },
        ringOffset: { value: DEFAULT_SETTINGS.ringOffset, min: -0.1, max: 0.25, step: 0.005 },
        ringWidth: { value: DEFAULT_SETTINGS.ringWidth, min: 0.05, max: 0.8, step: 0.01 },
      },
      { collapsed: true }
    ),
    Noise: folder(
      {
        noiseScale: { value: DEFAULT_SETTINGS.noiseScale, min: 1, max: 20, step: 0.1 },
        noiseStrength: { value: DEFAULT_SETTINGS.noiseStrength, min: 0, max: 0.3, step: 0.005 },
        distortionMix: { value: DEFAULT_SETTINGS.distortionMix, min: 0, max: 0.6, step: 0.01 },
      },
      { collapsed: true }
    ),
    Glow: folder(
      {
        glowStrength: { value: DEFAULT_SETTINGS.glowStrength, min: 0, max: 1.5, step: 0.01 },
        glowWidth: { value: DEFAULT_SETTINGS.glowWidth, min: 0.005, max: 0.12, step: 0.001 },
      },
      { collapsed: true }
    ),
    NormalMap: folder(
      {
        normalStrength: { value: DEFAULT_SETTINGS.normalStrength, min: 0, max: 0.15, step: 0.001 },
        normalScale: { value: DEFAULT_SETTINGS.normalScale, min: 0.25, max: 6, step: 0.01 },
        normalDrift: { value: DEFAULT_SETTINGS.normalDrift, min: -0.2, max: 0.2, step: 0.001 },
      },
      { collapsed: true }
    ),
  });
  const settingsRef = useRef<TransitionSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let rafId = 0;
    let renderer: THREE.WebGPURenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.MeshBasicNodeMaterial | null = null;
    let mesh: THREE.Mesh | null = null;
    let textureA: THREE.Texture | null = null;
    let textureB: THREE.Texture | null = null;
    let normalTexture: THREE.Texture | null = null;

    const progressUniform = uniform(settingsRef.current.progress);
    const progressAmplifyUniform = uniform(settingsRef.current.progressAmplify);
    const frontOffsetUniform = uniform(settingsRef.current.frontOffset);
    const shaderTimeUniform = uniform(settingsRef.current.time);
    const swapPhaseUniform = uniform(0);
    const rippleOriginUniform = uniform(new THREE.Vector2(0.5, 0.5));
    const noiseScaleUniform = uniform(settingsRef.current.noiseScale);
    const noiseStrengthUniform = uniform(settingsRef.current.noiseStrength);
    const distortionMixUniform = uniform(settingsRef.current.distortionMix);
    const rippleFrequencyUniform = uniform(settingsRef.current.rippleFrequency);
    const rippleAmplitudeUniform = uniform(settingsRef.current.rippleAmplitude);
    const rippleBandWidthUniform = uniform(settingsRef.current.rippleBandWidth);
    const rippleBandHardnessUniform = uniform(settingsRef.current.rippleBandHardness);
    const rippleTimeSpeedUniform = uniform(settingsRef.current.rippleTimeSpeed);
    const rippleEdgeBoostUniform = uniform(settingsRef.current.rippleEdgeBoost);
    const edgeSoftnessUniform = uniform(settingsRef.current.edgeSoftness);
    const edgeHardnessUniform = uniform(settingsRef.current.edgeHardness);
    const coreRadiusUniform = uniform(settingsRef.current.coreRadius);
    const coreFeatherUniform = uniform(settingsRef.current.coreFeather);
    const coreDistortUniform = uniform(settingsRef.current.coreDistort);
    const coreDarknessUniform = uniform(settingsRef.current.coreDarkness);
    const ringOffsetUniform = uniform(settingsRef.current.ringOffset);
    const ringWidthUniform = uniform(settingsRef.current.ringWidth);
    const glowStrengthUniform = uniform(settingsRef.current.glowStrength);
    const glowWidthUniform = uniform(settingsRef.current.glowWidth);
    const normalStrengthUniform = uniform(settingsRef.current.normalStrength);
    const normalScaleUniform = uniform(settingsRef.current.normalScale);
    const normalDriftUniform = uniform(settingsRef.current.normalDrift);

    const onResize = () => {
      if (!renderer || !container) return;
      renderer.setSize(container.clientWidth, container.clientHeight, false);
    };

    const animate = (now: number) => {
      if (!renderer || !scene || !camera) return;
      void now;
      progressUniform.value = settingsRef.current.progress;
      progressAmplifyUniform.value = settingsRef.current.progressAmplify;
      frontOffsetUniform.value = settingsRef.current.frontOffset;
      shaderTimeUniform.value = settingsRef.current.time;
      noiseScaleUniform.value = settingsRef.current.noiseScale;
      noiseStrengthUniform.value = settingsRef.current.noiseStrength;
      distortionMixUniform.value = settingsRef.current.distortionMix;
      rippleFrequencyUniform.value = settingsRef.current.rippleFrequency;
      rippleAmplitudeUniform.value = settingsRef.current.rippleAmplitude;
      rippleBandWidthUniform.value = settingsRef.current.rippleBandWidth;
      rippleBandHardnessUniform.value = settingsRef.current.rippleBandHardness;
      rippleTimeSpeedUniform.value = settingsRef.current.rippleTimeSpeed;
      rippleEdgeBoostUniform.value = settingsRef.current.rippleEdgeBoost;
      edgeSoftnessUniform.value = settingsRef.current.edgeSoftness;
      edgeHardnessUniform.value = settingsRef.current.edgeHardness;
      coreRadiusUniform.value = settingsRef.current.coreRadius;
      coreFeatherUniform.value = settingsRef.current.coreFeather;
      coreDistortUniform.value = settingsRef.current.coreDistort;
      coreDarknessUniform.value = settingsRef.current.coreDarkness;
      ringOffsetUniform.value = settingsRef.current.ringOffset;
      ringWidthUniform.value = settingsRef.current.ringWidth;
      glowStrengthUniform.value = settingsRef.current.glowStrength;
      glowWidthUniform.value = settingsRef.current.glowWidth;
      normalStrengthUniform.value = settingsRef.current.normalStrength;
      normalScaleUniform.value = settingsRef.current.normalScale;
      normalDriftUniform.value = settingsRef.current.normalDrift;
      renderer.render(scene, camera);
      rafId = window.requestAnimationFrame(animate);
    };

    const init = async () => {
      try {
        renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
        await renderer.init();
        if (!isMounted || !container) return;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const loader = new THREE.TextureLoader();
        [textureA, textureB, normalTexture] = await Promise.all([
          loader.loadAsync(imageA),
          loader.loadAsync(imageB),
          loader.loadAsync(normalMap),
        ]);
        if (!isMounted) return;

        textureA.colorSpace = THREE.SRGBColorSpace;
        textureB.colorSpace = THREE.SRGBColorSpace;
        normalTexture.colorSpace = THREE.NoColorSpace;
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;

        geometry = new THREE.PlaneGeometry(2, 2);
        material = new THREE.MeshBasicNodeMaterial();

        const uvNode = uv();
        const toCenter = uvNode.sub(rippleOriginUniform);
        const dist = length(toCenter);
        const noise = mx_noise_float(vec3(uvNode.mul(noiseScaleUniform), shaderTimeUniform.mul(0.25))).sub(0.5);
        const normalUv = uvNode
          .mul(normalScaleUniform)
          .add(vec2(0.0, shaderTimeUniform.mul(normalDriftUniform)));
        const normalVec = texture(normalTexture, normalUv).rgb.mul(2.0).sub(1.0);
        const front = progressUniform.mul(progressAmplifyUniform).add(frontOffsetUniform);
        const rippleBandMaskRaw = smoothstep(rippleBandWidthUniform, 0.0, abs(dist.sub(front)));
        const rippleBandMask = pow(clamp(rippleBandMaskRaw, 0.0, 1.0), rippleBandHardnessUniform);
        const ripple = sin(dist.mul(rippleFrequencyUniform).sub(shaderTimeUniform.mul(rippleTimeSpeedUniform)))
          .mul(rippleAmplitudeUniform)
          .mul(rippleBandMask);
        const distortionDir = toCenter.div(length(toCenter).add(0.0001));
        const coreMask = smoothstep(
          coreRadiusUniform.add(coreFeatherUniform),
          coreRadiusUniform.sub(coreFeatherUniform),
          dist
        );
        const coreWarp = distortionDir.mul(coreMask.mul(coreDistortUniform));
        const normalMask = clamp(rippleBandMask.add(coreMask.mul(0.6)), 0.0, 1.0);
        const normalDistortion = normalVec.xy.mul(normalStrengthUniform).mul(normalMask);
        const distortion = distortionDir
          .mul(ripple.add(noise.mul(noiseStrengthUniform.mul(distortionMixUniform))))
          .add(coreWarp)
          .add(normalDistortion);

        const uvA = uvNode.add(distortion.mul(oneMinus(progressUniform)));
        const uvB = uvNode.sub(distortion.mul(progressUniform));

        const sampleA = texture(textureA, uvA);
        const sampleB = texture(textureB, uvB);
        const fromSample = mix(sampleA, sampleB, swapPhaseUniform);
        const toSample = mix(sampleB, sampleA, swapPhaseUniform);

        const edgeField = clamp(dist.add(noise.mul(noiseStrengthUniform)).add(ripple.mul(rippleEdgeBoostUniform)), 0.0, 1.4);
        const blendRaw = smoothstep(front.sub(edgeSoftnessUniform), front.add(edgeSoftnessUniform), edgeField);
        const blend = pow(clamp(blendRaw, 0.0, 1.0), edgeHardnessUniform);
        const mixed = mix(toSample, fromSample, blend);

        const glow = smoothstep(glowWidthUniform, 0.0, abs(edgeField.sub(front))).mul(glowStrengthUniform);
        const coreDark = oneMinus(coreMask.mul(coreDarknessUniform));
        const color = mixed.rgb
          .mul(coreDark)
          .add(vec3(glow.mul(0.3), glow.mul(0.2), glow.mul(0.45)));
        material.colorNode = vec4(color, mixed.a);

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        onResize();
        window.addEventListener("resize", onResize);
        rafId = window.requestAnimationFrame(animate);
      } catch {
        if (isMounted) {
          setError("WebGPU/TSL failed to initialize in this browser.");
        }
      }
    };

    init();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);

      geometry?.dispose();
      material?.dispose();
      textureA?.dispose();
      textureB?.dispose();
      normalTexture?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [imageA, imageB, normalMap]);

  return (
    <div className="space-y-4">
      <Leva
        titleBar={{ title: "Shader Controls", drag: false, filter: false }}
        oneLineLabels
        flat
        fill={false}
        hideCopyButton
      />

      <div className="relative mx-auto aspect-square w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div ref={containerRef} className="h-full w-full" />

        <div className="pointer-events-none absolute left-4 top-4 rounded-md bg-black/55 px-3 py-2 text-xs text-zinc-200 backdrop-blur">
          Ripple + Noise Transition (TSL)
        </div>

        {error ? (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
