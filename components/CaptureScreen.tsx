
import React, { useEffect, useRef, useState } from 'react';
import { VideoCameraIcon } from './Icons';

const CaptureScreen: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera API not available in this browser.');
        }
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1080 },
            height: { ideal: 1920 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        if (err instanceof Error) {
            setError(`Error: ${err.message}. Please ensure you've granted camera permissions.`);
        } else {
            setError("An unknown error occurred while accessing the camera.");
        }
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen w-screen bg-black overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex items-center p-4 space-x-3">
          <VideoCameraIcon className="w-7 h-7 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">Capture testing space video</h1>
        </div>
      </header>
      
      <main className="flex-grow w-full h-full relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>
        
        {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                <div className="text-center p-8 max-w-sm text-white">
                    <h2 className="text-2xl font-bold mb-4">Camera Error</h2>
                    <p className="text-red-400">{error}</p>
                </div>
            </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {/* Dashed Box */}
          <div className="w-[90%] h-[75%] border-2 border-dashed border-white/50 rounded-2xl"></div>

          {/* Right Arrow */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          
          {/* Red Level Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/80 -translate-y-1/2"></div>
        </div>
      </main>
    </div>
  );
};

export default CaptureScreen;
