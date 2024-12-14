import React, { useState } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { theme } from '../styles/theme';
import { ConfirmDialog } from './ConfirmDialog';

interface GameControlsProps {
  onNewGame: () => void;
  onBack: () => void;
}

export function GameControls({ onNewGame, onBack }: GameControlsProps) {
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);

  return (
    <>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowBackConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <button
          onClick={() => setShowNewGameConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-transform hover:scale-[1.02]"
          style={{ background: theme.gradients.primary }}
        >
          <RotateCcw size={20} />
          New Game
        </button>
      </div>

      <ConfirmDialog
        isOpen={showNewGameConfirm}
        title="Start New Game"
        message="Are you sure you want to start a new game? Current progress will be lost."
        onConfirm={() => {
          setShowNewGameConfirm(false);
          onNewGame();
        }}
        onCancel={() => setShowNewGameConfirm(false)}
      />

      <ConfirmDialog
        isOpen={showBackConfirm}
        title="Return to Menu"
        message="Are you sure you want to return to the main menu? Current progress will be lost."
        onConfirm={() => {
          setShowBackConfirm(false);
          onBack();
        }}
        onCancel={() => setShowBackConfirm(false)}
      />
    </>
  );
}