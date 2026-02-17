"use client";

import { useState, useRef, useEffect } from "react";
import { Square } from "lucide-react";

const INITIAL_AUDIO_LEVELS = Array.from({ length: 40 }, (_, i) => {
  // Deterministic seed pattern to avoid SSR/client hydration mismatch.
  const t = i / 39;
  return 0.2 + (0.5 * (0.5 + 0.5 * Math.sin(t * Math.PI * 3.2)));
});

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(INITIAL_AUDIO_LEVELS);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Setup audio context for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Animate waveform
      animateWaveform();

      mediaRecorder.ondataavailable = (event) => {
        // Handle recorded data here if needed
        console.log("Data available:", event.data);
      };
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const animateWaveform = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const animate = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);

      // Update audio levels based on actual frequency data
      const newLevels = Array(40).fill(0).map((_, i) => {
        const index = Math.floor((i / 40) * bufferLength);
        return (dataArray[index] / 255) * 0.8 + 0.2;
      });

      setAudioLevels(newLevels);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden p-8"
        style={{
          background: 'radial-gradient(circle at top left, rgba(126, 34, 206, 0.4) 0%, rgba(88, 28, 135, 0.2) 20%, rgba(0, 0, 0, 1) 50%)',
          backgroundColor: '#000000'
        }}
      >
        {/* Title */}
        <div className="text-white/60 text-sm mb-8">Voice recorder</div>

        {/* Stop Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-lime-400 hover:bg-lime-300 transition-colors flex items-center justify-center group"
        >
          <Square className="w-5 h-5 text-black fill-black" />
        </button>

        {/* Waveform Visualization */}
        <div className="relative h-32 flex items-center justify-center mb-8">
          <div className="flex items-center gap-1 h-full">
            {audioLevels.map((level, i) => {
              const height = level * 100;
              const isCenter = i > 15 && i < 25;
              const glowIntensity = isCenter ? level : level * 0.3;

              return (
                <div
                  key={i}
                  className="relative w-1.5 transition-all duration-100"
                  style={{
                    height: `${height}%`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full transition-all"
                    style={{
                      background: isCenter
                        ? `linear-gradient(to top, #84cc16, #bef264)`
                        : '#4b5563',
                      boxShadow: isCenter
                        ? `0 0 ${glowIntensity * 20}px ${glowIntensity * 10}px rgba(190, 242, 100, ${glowIntensity * 0.6})`
                        : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Playhead */}
          <div
            className="absolute w-0.5 h-full bg-lime-400"
            style={{
              left: '50%',
              boxShadow: '0 0 10px 2px rgba(190, 242, 100, 0.5)',
            }}
          />
        </div>

        {/* Timer */}
        <div className="flex items-baseline gap-2">
          <div className="text-6xl font-light text-white tracking-tight">
            {formatTime(duration)}
          </div>
          <div className="text-white/60 text-sm mb-2">min</div>
        </div>
      </div>
    </div>
  );
}
