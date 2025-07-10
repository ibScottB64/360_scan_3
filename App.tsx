
import React, { useState } from 'react';
import InstructionsScreen from './components/InstructionsScreen';
import CaptureScreen from './components/CaptureScreen';

type View = 'instructions' | 'capture';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('instructions');

  const handleStartCapture = () => {
    setCurrentView('capture');
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen font-sans antialiased">
      {currentView === 'instructions' && (
        <InstructionsScreen onStartCapture={handleStartCapture} />
      )}
      {currentView === 'capture' && <CaptureScreen />}
    </div>
  );
};

export default App;
