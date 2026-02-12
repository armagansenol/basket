"use client";

import { useRef, useEffect } from "react";
import { Shield, MoreHorizontal, Play, AlertTriangle } from "lucide-react";
import * as THREE from "three";
import { useControls } from "leva";

export default function PreventBentoItem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);

  // Leva controls for ripple parameters
  const controls = useControls("Ripple Animation", {
    speed: { value: 2.0, min: 0.5, max: 5.0, step: 0.1, label: "Speed" },
    frequency1: { value: 30.0, min: 10, max: 60, step: 1, label: "Frequency 1" },
    frequency2: { value: 35.0, min: 10, max: 60, step: 1, label: "Frequency 2" },
    frequency3: { value: 40.0, min: 10, max: 60, step: 1, label: "Frequency 3" },
    amplitude: { value: 0.6, min: 0.1, max: 1.0, step: 0.05, label: "Amplitude" },
    fadeDistance: { value: 0.5, min: 0.1, max: 0.9, step: 0.05, label: "Fade Distance" },
    sharpness: { value: 0.3, min: 0.0, max: 0.8, step: 0.05, label: "Ring Sharpness" },
    easingPower: { value: 2.0, min: 1.0, max: 4.0, step: 0.1, label: "Fade Curve" },
    colorR: { value: 0.2, min: 0, max: 1, step: 0.01, label: "Color R" },
    colorG: { value: 0.7, min: 0, max: 1, step: 0.01, label: "Color G" },
    colorB: { value: 1.0, min: 0, max: 1, step: 0.01, label: "Color B" },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const shieldElement = shieldRef.current;
    if (!canvas || !shieldElement) return;

    // Calculate shield center position relative to canvas
    const canvasRect = canvas.getBoundingClientRect();
    const shieldRect = shieldElement.getBoundingClientRect();

    const centerX = (shieldRect.left + shieldRect.width / 2 - canvasRect.left) / canvasRect.width;
    const centerY = (shieldRect.top + shieldRect.height / 2 - canvasRect.top) / canvasRect.height;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Shader material
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
        uCenter: { value: new THREE.Vector2(centerX, centerY) },
        uSpeed: { value: controls.speed },
        uFrequency1: { value: controls.frequency1 },
        uFrequency2: { value: controls.frequency2 },
        uFrequency3: { value: controls.frequency3 },
        uAmplitude: { value: controls.amplitude },
        uFadeDistance: { value: controls.fadeDistance },
        uSharpness: { value: controls.sharpness },
        uEasingPower: { value: controls.easingPower },
        uColor: { value: new THREE.Vector3(controls.colorR, controls.colorG, controls.colorB) },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uCenter;
        uniform float uSpeed;
        uniform float uFrequency1;
        uniform float uFrequency2;
        uniform float uFrequency3;
        uniform float uAmplitude;
        uniform float uFadeDistance;
        uniform float uSharpness;
        uniform float uEasingPower;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;

          // Distance from shield center
          float dist = distance(uv, uCenter);

          // Create multiple ripples with controllable frequencies and speeds
          float ripple1 = sin((dist * uFrequency1) - (uTime * uSpeed));
          float ripple2 = sin((dist * uFrequency2) - (uTime * (uSpeed * 1.25)));
          float ripple3 = sin((dist * uFrequency3) - (uTime * (uSpeed * 1.5)));

          // Combine ripples
          float ripple = (ripple1 + ripple2 * 0.5 + ripple3 * 0.3) / 1.8;

          // Create sharp rings with controllable sharpness
          ripple = smoothstep(uSharpness, uSharpness + 0.2, ripple);

          // Fade based on distance with controllable range and easing
          float fade = 1.0 - smoothstep(0.0, uFadeDistance, dist);
          fade = pow(fade, uEasingPower); // Apply easing curve

          // Final ripple intensity
          float intensity = ripple * fade * uAmplitude;

          // Output with controllable color
          gl_FragColor = vec4(uColor, intensity);
        }
      `,
    });

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let animationId: number;

    function animate() {
      material.uniforms.uTime.value += 0.016;

      // Update uniforms from controls
      material.uniforms.uSpeed.value = controls.speed;
      material.uniforms.uFrequency1.value = controls.frequency1;
      material.uniforms.uFrequency2.value = controls.frequency2;
      material.uniforms.uFrequency3.value = controls.frequency3;
      material.uniforms.uAmplitude.value = controls.amplitude;
      material.uniforms.uFadeDistance.value = controls.fadeDistance;
      material.uniforms.uSharpness.value = controls.sharpness;
      material.uniforms.uEasingPower.value = controls.easingPower;
      material.uniforms.uColor.value.set(controls.colorR, controls.colorG, controls.colorB);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [controls]);

  return (
    <div className="w-full max-w-sm">
      <div className="relative rounded-3xl overflow-hidden bg-white p-6 border border-neutral-200">
        {/* Header */}
        <div className="mb-4 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rotate-45 bg-cyan-500" />
            <h3 className="text-neutral-900 font-semibold">Prevent</h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Uncover blind spots, inefficiencies, and stop issues, before they become incidents.
          </p>
        </div>

        {/* Alert Badges */}
        <div className="space-y-2 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-xs text-orange-700 font-medium">Δ Unknown Root Cause</span>
          </div>
          <div className="block" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-600" />
            <span className="text-xs text-yellow-700 font-medium">Too Many Alerts</span>
          </div>
        </div>

        {/* Ripple Animation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ mixBlendMode: "normal" }}
        />

        {/* Center Shield Icon */}
        <div className="relative flex items-center justify-center h-32 mb-6">
          <div className="relative" ref={shieldRef}>
            {/* Shield with glow */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-cyan-50 border-2 border-cyan-200 flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-8 h-8 text-cyan-600" />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 w-16 h-16 bg-cyan-200/40 rounded-2xl blur-xl" />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between relative z-10">
          <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>

          <button className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm flex items-center gap-1 font-medium">
            <Play className="w-4 h-4" />
            <span>Play</span>
          </button>
        </div>
      </div>
    </div>
  );
}
