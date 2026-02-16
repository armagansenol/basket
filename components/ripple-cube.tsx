"use client";

import { useEffect, useRef } from "react";
import type p5 from "p5";

export default function RippleCube() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let p5Instance: p5 | null = null;
    let isCancelled = false;
    const container = containerRef.current;

    // Dynamically import p5 only on client side
    import("p5").then((p5Module) => {
      if (isCancelled) return; // Don't create instance if component unmounted
      const P5 = p5Module.default;

      const sketch = (p: p5) => {
        let sdr: p5.Shader;
        let g: p5.Graphics;
        const waves: number[][] = [];
        const WAVE_N = 20;
        const WAVE_LIFE = 500;
        let W: number;

        const getGlsl = (opt: { waveNum: number; waveLife: number }) => {
          const vs = `
    precision highp float;
    precision highp int;

    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aTexCoord;

    uniform vec3 uAmbientColor[5];

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform mat3 uNormalMatrix;
    uniform int uAmbientLightCount;

    varying vec3 vNormal;
    varying vec2 vTexCoord;
    varying vec3 vViewPosition;
    varying vec3 vAmbientColor;

    void main(void) {

        vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);

        // Pass varyings to fragment shader
        vViewPosition = viewModelPosition.xyz;
        gl_Position = uProjectionMatrix * viewModelPosition;

        vNormal = uNormalMatrix * aNormal;
        vTexCoord = aTexCoord;

        // TODO: this should be a uniform
        vAmbientColor = vec3(0.0);
        for (int i = 0; i < 5; i++) {
            if (i < uAmbientLightCount) {
                vAmbientColor += uAmbientColor[i];
            }
        }
    }
    `;

          const fs = `
    precision highp float;
    precision highp int;

    uniform mat4 uViewMatrix;

    uniform bool uUseLighting;

    uniform int uAmbientLightCount;
    uniform vec3 uAmbientColor[5];

    uniform int uDirectionalLightCount;
    uniform vec3 uLightingDirection[5];
    uniform vec3 uDirectionalDiffuseColors[5];
    uniform vec3 uDirectionalSpecularColors[5];

    uniform int uPointLightCount;
    uniform vec3 uPointLightLocation[5];
    uniform vec3 uPointLightDiffuseColors[5];
    uniform vec3 uPointLightSpecularColors[5];

    uniform int uSpotLightCount;
    uniform float uSpotLightAngle[5];
    uniform float uSpotLightConc[5];
    uniform vec3 uSpotLightDiffuseColors[5];
    uniform vec3 uSpotLightSpecularColors[5];
    uniform vec3 uSpotLightLocation[5];
    uniform vec3 uSpotLightDirection[5];

    uniform bool uSpecular;
    uniform float uShininess;

    uniform float uConstantAttenuation;
    uniform float uLinearAttenuation;
    uniform float uQuadraticAttenuation;

    const float specularFactor = 2.0;
    const float diffuseFactor = 0.73;

    struct LightResult {
        float specular;
        float diffuse;
    };

    float _phongSpecular(
        vec3 lightDirection,
        vec3 viewDirection,
        vec3 surfaceNormal,
        float shininess) {

        vec3 R = reflect(lightDirection, surfaceNormal);
        return pow(max(0.0, dot(R, viewDirection)), shininess);
    }

    float _lambertDiffuse(vec3 lightDirection, vec3 surfaceNormal) {
        return max(0.0, dot(-lightDirection, surfaceNormal));
    }

    LightResult _light(vec3 viewDirection, vec3 normal, vec3 lightVector) {

        vec3 lightDir = normalize(lightVector);

        //compute our diffuse & specular terms
        LightResult lr;
        if (uSpecular)
            lr.specular = _phongSpecular(lightDir, viewDirection, normal, uShininess);
        lr.diffuse = _lambertDiffuse(lightDir, normal);
        return lr;
    }

    void totalLight(
        vec3 modelPosition,
        vec3 normal,
        out vec3 totalDiffuse,
        out vec3 totalSpecular
    ) {

        totalSpecular = vec3(0.0);

        if (!uUseLighting) {
            totalDiffuse = vec3(1.0);
            return;
        }

        totalDiffuse = vec3(0.0);

        vec3 viewDirection = normalize(-modelPosition);

        for (int j = 0; j < 5; j++) {
            if (j < uDirectionalLightCount) {
                vec3 lightVector = (uViewMatrix * vec4(uLightingDirection[j], 0.0)).xyz;
                vec3 lightColor = uDirectionalDiffuseColors[j];
                vec3 specularColor = uDirectionalSpecularColors[j];
                LightResult result = _light(viewDirection, normal, lightVector);
                totalDiffuse += result.diffuse * lightColor;
                totalSpecular += result.specular * lightColor * specularColor;
            }

            if (j < uPointLightCount) {
                vec3 lightPosition = (uViewMatrix * vec4(uPointLightLocation[j], 1.0)).xyz;
                vec3 lightVector = modelPosition - lightPosition;

                //calculate attenuation
                float lightDistance = length(lightVector);
                float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);
                vec3 lightColor = lightFalloff * uPointLightDiffuseColors[j];
                vec3 specularColor = lightFalloff * uPointLightSpecularColors[j];

                LightResult result = _light(viewDirection, normal, lightVector);
                totalDiffuse += result.diffuse * lightColor;
                totalSpecular += result.specular * lightColor * specularColor;
            }

            if(j < uSpotLightCount) {
                vec3 lightPosition = (uViewMatrix * vec4(uSpotLightLocation[j], 1.0)).xyz;
                vec3 lightVector = modelPosition - lightPosition;

                float lightDistance = length(lightVector);
                float lightFalloff = 1.0 / (uConstantAttenuation + lightDistance * uLinearAttenuation + (lightDistance * lightDistance) * uQuadraticAttenuation);

                vec3 lightDirection = (uViewMatrix * vec4(uSpotLightDirection[j], 0.0)).xyz;
                float spotDot = dot(normalize(lightVector), normalize(lightDirection));
                float spotFalloff;
                if(spotDot < uSpotLightAngle[j]) {
                    spotFalloff = 0.0;
                }
                else {
                    spotFalloff = pow(spotDot, uSpotLightConc[j]);
                }
                lightFalloff *= spotFalloff;

                vec3 lightColor = uSpotLightDiffuseColors[j];
                vec3 specularColor = uSpotLightSpecularColors[j];

                LightResult result = _light(viewDirection, normal, lightVector);

                totalDiffuse += result.diffuse * lightColor * lightFalloff;
                totalSpecular += result.specular * lightColor * specularColor * lightFalloff;
            }
        }

        totalDiffuse *= diffuseFactor;
        totalSpecular *= specularFactor;
    }
    precision highp float;
    precision highp int;

    uniform vec4 uMaterialColor;
    uniform vec4 uTint;
    uniform sampler2D uSampler;
    uniform bool isTexture;
    uniform bool uEmissive;

    varying vec3 vNormal;
    varying vec2 vTexCoord;
    varying vec3 vViewPosition;
    varying vec3 vAmbientColor;

    //additional uniforms for me
    uniform vec2 resolution;
    uniform float t;
    uniform vec3 waves[${opt.waveNum}];

    //pseudorandom
    float random(vec2 co, float t){
        return fract(sin(dot(co.xy ,vec2(12.9898 + sin(t),78.233))) * 43758.5453);
    }

    void main(void) {
        vec2 coord = gl_FragCoord.xy / resolution * 2. - 1.;
        vec3 diffuse;
        vec3 specular;
        totalLight(vViewPosition, normalize(vNormal), diffuse, specular);

        if(uEmissive && !isTexture) {
            gl_FragColor = uMaterialColor;
        }
        else {
            vec2 shift = vec2(0.,0.);

            for (int i = 0; i < ${opt.waveNum}; i++) {
                if(waves[i].z + float(${opt.waveLife}) > t){
                    float speed = 1.0 / 5.0;
                    vec2 waveCoord = waves[i].xy / resolution * 2. - 1.;
                    vec2 center = waveCoord;
                    vec2 v = coord - center;
                    vec2 n = normalize(v);
                    float tt = t - waves[i].z;
                    float phase = min(length(v) * 80. - speed * tt, 0.);
                    float amp = 0.05 / length(v) * exp(-tt / 40.);
                    shift += n * sin(phase) * amp;
                }
            }

            vec2 texCoord = vTexCoord + shift;

            gl_FragColor = isTexture ? texture2D(uSampler, texCoord) * (uTint / vec4(255, 255, 255, 255)) : uMaterialColor;
            gl_FragColor.rgb = gl_FragColor.rgb * (diffuse + vAmbientColor) + specular;
            gl_FragColor = clamp(gl_FragColor, 0., 1.);

            float alpha = 0.15;
            vec3 grain = vec3(random(coord, t));
            vec3 col = grain * alpha + gl_FragColor.rgb * (1. - alpha);
            const float yellow = 0.02;
            gl_FragColor = vec4(col, 1.0) + vec4(yellow, yellow, -yellow, 0.0);
        }
    }
    `;
          return { vs, fs };
        };

        p.setup = () => {
          p.pixelDensity(1);
          W = p.min(p.windowWidth, p.windowHeight);
          p.createCanvas(W, W, p.WEBGL);
          p.colorMode(p.HSB, 1);

          g = p.createGraphics(p.width, p.height, p.WEBGL);
          g.colorMode(p.HSB, 1);
          g.directionalLight(0, 0, 1, 1, 1, -1);
          g.ambientLight(0, 0, 0.5);

          const glsl = getGlsl({ waveNum: WAVE_N, waveLife: WAVE_LIFE });
          for (let i = WAVE_N; i--;) {
            waves.push([0, 0, -WAVE_LIFE]);
          }

          sdr = p.createShader(glsl.vs, glsl.fs);
          p.shader(sdr);
          sdr.setUniform("resolution", [p.width, p.height]);
          p.noStroke();
        };

        p.draw = () => {
          const t = p.frameCount;
          p.blendMode(p.BLEND);
          g.clear();
          g.background(0.1);
          g.push();
          g.rotateX(p.PI / 4);
          g.rotateZ(p.PI / 4 + t / 100);
          g.rotateY(0);
          g.box(W / 4);
          g.pop();
          p.image(g, -p.width / 2, -p.height / 2);

          sdr.setUniform("t", t);
          sdr.setUniform("waves", waves.flat());

          if (waves[0] && waves[0][2] < p.frameCount - WAVE_LIFE) {
            waves.shift();
          }
        };

        const getCanvasMousePos = () => {
          // @ts-expect-error - canvas is not in the type definition but available at runtime
          const canvas = p.canvas as HTMLCanvasElement;
          const rect = canvas.getBoundingClientRect();
          // Use window mouse coordinates and convert to canvas coordinates
          const x = p.winMouseX - rect.left;
          const y = p.winMouseY - rect.top;
          return { x, y };
        };

        // @ts-expect-error - touchStarted is not in the type definition but used by p5
        p.touchStarted = () => {
          if (waves.length !== WAVE_N) {
            const pos = getCanvasMousePos();
            if (pos.x >= 0 && pos.x <= p.width && pos.y >= 0 && pos.y <= p.height) {
              waves.push([pos.x, p.height - pos.y, p.frameCount]);
            }
          }
          return false; // Prevent default
        };

        p.mousePressed = () => {
          const pos = getCanvasMousePos();
          if (pos.x >= 0 && pos.x <= p.width && pos.y >= 0 && pos.y <= p.height) {
            if (waves.length !== WAVE_N) {
              waves.push([pos.x, p.height - pos.y, p.frameCount]);
            }
          }
          return false; // Prevent default
        };

        p.windowResized = () => {
          W = p.min(p.windowWidth, p.windowHeight);
          p.resizeCanvas(W, W);
          if (g) {
            g.resizeCanvas(p.width, p.height);
          }
          if (sdr) {
            sdr.setUniform("resolution", [p.width, p.height]);
          }
        };
      };

      if (container) {
        p5Instance = new P5(sketch, container);
      }
    });

    // Cleanup function
    return () => {
      isCancelled = true;
      if (p5Instance) {
        p5Instance.remove();
      }
      // Clear container to prevent duplicate canvases
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
