import Link from "next/link";
import { Mic, MousePointerClick, BarChart3, Shield, ListChecks, Zap, Music, Sparkles, Flag, Target, Type, Flower2, Box, FileText, Circle, Palette, Grid3x3, Play, Network, Image, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Component Basket</h1>
          <p className="text-xl text-neutral-600">
            A collection of reusable components for building modern web applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/voice-recorder">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Mic className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Voice Recorder</h2>
              <p className="text-neutral-600">
                Audio recording component with playback controls.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/animated-cta-button">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <MousePointerClick className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Animated CTA Button</h2>
              <p className="text-neutral-600">
                Beautiful call-to-action button with hover effects.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/analytics-card">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Analytics Card</h2>
              <p className="text-neutral-600">
                Dashboard card with stats and multi-line chart.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/prevent-bento-item">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Shield className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Prevent Bento Item</h2>
              <p className="text-neutral-600">
                Bento grid card with shader-based ripple animation.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/personality-test">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <ListChecks className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Personality Test</h2>
              <p className="text-neutral-600">
                Radio input form with morphing metaball background.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/race-track">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Zap className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Race Track</h2>
              <p className="text-neutral-600">
                Animated racing visualization with curved lanes.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/audio-visualizer">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Music className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Audio Visualizer</h2>
              <p className="text-neutral-600">
                Radial arc visualization with FFT audio analysis.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/radial-burst">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Sparkles className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Radial Burst</h2>
              <p className="text-neutral-600">
                Generative art with asymmetric radial point distribution.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/race-poster">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Flag className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Race Poster</h2>
              <p className="text-neutral-600">
                Animated race with perspective lanes and glowing spheres.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/poster-wistart">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Target className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">W-I-START Poster</h2>
              <p className="text-neutral-600">
                Retro-futuristic poster with elliptical tracks and film grain.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/ascii-blobs">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Type className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">ASCII Blobs</h2>
              <p className="text-neutral-600">
                Animated typewriter art with morphing metaball fields.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/bunny-ear-cactus">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Flower2 className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Bunny Ear Cactus</h2>
              <p className="text-neutral-600">
                Recursive cactus growth on sandy desert background.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/ripple-cube">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Box className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Ripple Cube</h2>
              <p className="text-neutral-600">
                GLSL shader with 3D cube and interactive ripple waves.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/typewriter-poem">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <FileText className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Typewriter Poem</h2>
              <p className="text-neutral-600">
                Flowing typewriter art with Yeats' poetry and noise animation.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/metaball-blobs">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Circle className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Metaball Blobs</h2>
              <p className="text-neutral-600">
                Physics-based metaballs with GLSL shaders and reflections.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/palette-generator">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Palette className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Palette Generator</h2>
              <p className="text-neutral-600">
                Interactive color palette tool with HSB gradient sampling.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/geometric-grid">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Grid3x3 className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Geometric Grid</h2>
              <p className="text-neutral-600">
                Abstract geometric pattern grid with colored drop shadows.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/motion-grid">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Play className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Motion Grid</h2>
              <p className="text-neutral-600">
                Animated 6×6 grid with 4 looping motion patterns and smooth easing.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/point-network">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Network className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Point Network</h2>
              <p className="text-neutral-600">
                Generative network with connected points and noise-based patterns.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/shape-display">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Image className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Shape Display</h2>
              <p className="text-neutral-600">
                Loading and displaying custom shape image using p5.js.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/particle-formations">
            <div className="group p-6 border rounded-lg hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="mb-4 w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <Star className="w-6 h-6 text-neutral-700" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Particle Formations</h2>
              <p className="text-neutral-600">
                1000 particles morphing between mathematical formations.
              </p>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                  View Component →
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
