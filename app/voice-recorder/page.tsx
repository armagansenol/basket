import VoiceRecorder from "@/components/voice-recorder";

export default function VoiceRecorderPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Voice Recorder</h1>
            <p className="text-neutral-600">
              A beautiful voice recording component with real-time waveform visualization.
            </p>
          </div>

          <div className="bg-neutral-100 p-12 rounded-lg flex items-center justify-center">
            <VoiceRecorder />
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="space-y-2 text-neutral-700">
              <li>• <strong>Real-time waveform visualization</strong> - Dynamic audio level display</li>
              <li>• <strong>Timer display</strong> - Shows recording duration in HH:MM:SS format</li>
              <li>• <strong>Gradient background</strong> - Beautiful purple to black gradient</li>
              <li>• <strong>Glowing effects</strong> - Yellow-green glow on active waveform sections</li>
              <li>• <strong>Browser API</strong> - Uses MediaRecorder API for audio capture</li>
            </ul>
          </div>

          <div className="mt-4 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Usage</h2>
            <p className="text-neutral-700 mb-2">
              Click the yellow-green button to start/stop recording. The component will request microphone access on first use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
