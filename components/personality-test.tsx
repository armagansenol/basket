"use client";

import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";

interface Question {
  id: string;
  left: string;
  right: string;
}

const questions: Question[] = [
  { id: "q1", left: "SERIOUS", right: "OPTIMISTIC" },
  { id: "q2", left: "CLASSIC", right: "FUTURISTIC" },
  { id: "q3", left: "SUPPORTIVE", right: "AUTHORITATIVE" },
  { id: "q4", left: "TRUSTWORTHY", right: "UNKNOWN" },
  { id: "q5", left: "TECH DRIVEN", right: "HUMAN FOCUSED" },
];

export default function PersonalityTest() {
  const [selections, setSelections] = useState<Record<string, number>>({
    q1: 3,
    q2: 4,
    q3: 1,
    q4: 0,
    q5: 2,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radioRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleSelection = (questionId: string, value: number) => {
    console.log(`Selection changed: ${questionId} = ${value} (button index ${value}, which is button #${value + 1})`);
    setSelections((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    // Wait a bit for DOM to be ready
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor(0x000000, 0);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uPos0: { value: new THREE.Vector2(0.5, 0.2) },
        uPos1: { value: new THREE.Vector2(0.5, 0.35) },
        uPos2: { value: new THREE.Vector2(0.5, 0.5) },
        uPos3: { value: new THREE.Vector2(0.5, 0.65) },
        uPos4: { value: new THREE.Vector2(0.5, 0.8) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uPos0;
        uniform vec2 uPos1;
        uniform vec2 uPos2;
        uniform vec2 uPos3;
        uniform vec2 uPos4;
        varying vec2 vUv;

        float drawCircle(vec2 uv, vec2 pos) {
          float dist = distance(uv, pos);
          float radius = 0.06;
          float softness = 0.04;
          float circle = smoothstep(radius + softness, radius - softness, dist);
          float glowRadius = 0.15;
          float glow = smoothstep(glowRadius, radius, dist) * 0.5;
          return circle * 0.8 + glow;
        }

        void main() {
          vec2 uv = vUv;
          vec3 color = vec3(0.5, 0.7, 0.95);

          float alpha0 = drawCircle(uv, uPos0);
          float alpha1 = drawCircle(uv, uPos1);
          float alpha2 = drawCircle(uv, uPos2);
          float alpha3 = drawCircle(uv, uPos3);
          float alpha4 = drawCircle(uv, uPos4);

          float totalAlpha = alpha0 + alpha1 + alpha2 + alpha3 + alpha4;
          totalAlpha = min(totalAlpha, 1.0);

          gl_FragColor = vec4(color, totalAlpha);
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Check for shader compilation errors
    const gl = renderer.getContext();
    const program = (renderer.properties.get(material) as any).programs?.values().next().value?.program;

    if (program && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program failed to link:', gl.getProgramInfoLog(program));
    }

    // Initial render to compile shader
    renderer.render(scene, camera);

    let animationId: number;

    function animate() {
      // Update all positions
      const positions: THREE.Vector2[] = [];
      if (!canvas) return;
      const canvasRect = canvas.getBoundingClientRect();

      questions.forEach((q, index) => {
        const key = `${q.id}-${selections[q.id]}`;
        const element = radioRefs.current.get(key);

        if (element) {
          const rect = element.getBoundingClientRect();
          const centerX = (rect.left + rect.width / 2 - canvasRect.left) / canvasRect.width;
          const centerY = (rect.top + rect.height / 2 - canvasRect.top) / canvasRect.height;
          positions.push(new THREE.Vector2(centerX, centerY));
        } else {
          console.warn(`Missing ref for ${key}`);
          positions.push(new THREE.Vector2(0.5, 0.5)); // Fallback
        }
      });

      // Update individual uniforms
      if (positions[0]) material.uniforms.uPos0.value.set(positions[0].x, positions[0].y);
      if (positions[1]) material.uniforms.uPos1.value.set(positions[1].x, positions[1].y);
      if (positions[2]) material.uniforms.uPos2.value.set(positions[2].x, positions[2].y);
      if (positions[3]) material.uniforms.uPos3.value.set(positions[3].x, positions[3].y);
      if (positions[4]) material.uniforms.uPos4.value.set(positions[4].x, positions[4].y);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    animate();

      return () => {
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [selections]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-[#e8e4dc] p-12">
        {/* Single canvas for all circles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Questions */}
        <div className="relative z-10 space-y-12">
          {questions.map((question) => (
            <div key={question.id} className="flex items-center gap-4">
              {/* Left label */}
              <div className="w-32 text-xs font-medium text-neutral-700 text-right">
                {question.left}
              </div>

              {/* Radio options */}
              <div className="flex-1 flex items-center justify-between relative">
                {/* Line */}
                <div className="absolute inset-0 h-px bg-neutral-400 top-1/2 -translate-y-1/2" />

                {/* 5 radio options */}
                {[0, 1, 2, 3, 4].map((value) => {
                  const isSelected = selections[question.id] === value;
                  const key = `${question.id}-${value}`;

                  return (
                    <button
                      key={value}
                      ref={(el) => {
                        if (el) radioRefs.current.set(key, el);
                      }}
                      onClick={() => handleSelection(question.id, value)}
                      className="relative z-10 transition-all duration-200"
                    >
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isSelected
                            ? "w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg"
                            : "w-3 h-3 bg-neutral-800 hover:bg-neutral-700"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right label */}
              <div className="w-32 text-xs font-medium text-neutral-700">
                {question.right}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
