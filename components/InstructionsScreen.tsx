
import React from 'react';
import { SunIcon, DeskIcon, PhoneIcon, RotateIcon, SnailIcon } from './Icons';

interface InstructionsScreenProps {
  onStartCapture: () => void;
}

const InstructionItem: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <div className="flex items-center space-x-6">
    <div className="text-gray-400">{icon}</div>
    <p className="text-lg text-gray-200">{text}</p>
  </div>
);

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onStartCapture }) => {
  const instructions = [
    {
      icon: <SunIcon className="w-8 h-8" />,
      text: 'Ensure testing space is well-lit',
    },
    {
      icon: <DeskIcon className="w-8 h-8" />,
      text: 'Stand in the middle of your testing space facing your desk.',
    },
    {
      icon: <PhoneIcon className="w-8 h-8" />,
      text: 'Hold your mobile phone in portrait mode and as level as possible.',
    },
    {
      icon: <RotateIcon className="w-8 h-8" />,
      text: 'When prompted start rotating to your right 360°',
    },
    {
      icon: <SnailIcon className="w-8 h-8" />,
      text: 'Move slowly to ensure proper capturing of your environment.',
    },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-6 bg-gray-800">
      <div className="flex-grow flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Testing space video scan instructions
        </h1>
        <div className="space-y-8">
          {instructions.map((item, index) => (
            <InstructionItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
      <div className="py-4">
        <button
          onClick={onStartCapture}
          className="w-full bg-gray-700/50 border border-gray-500 text-white font-semibold text-lg py-4 px-6 rounded-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors duration-200"
        >
          Capture video
        </button>
      </div>
    </div>
  );
};

export default InstructionsScreen;
