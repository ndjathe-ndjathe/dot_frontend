import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameSetup } from './components/GameSetup';
import { ScoreBoard } from './components/ScoreBoard';
import { GameControls } from './components/GameControls';
import { PlayerIndicator } from './components/PlayerIndicator';
import { WinnerDisplay } from './components/WinnerDisplay';
import { GameSettings } from './types/game';
import { useGameState } from './hooks/useGameState';
import { isGameOver } from './utils/gameUtils';

function App() {
  const [settings, setSettings] = React.useState<GameSettings | null>(null);
  const { gameState, setGameState, handleDotClick } = useGameState(settings);

  const handleStart = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setGameState({
      currentPlayer: 0,
      points: [0, 0],
      dots: [],
      lines: [],
      squares: [],
      timeLeft: newSettings.turnTime,
      totalTime: [0, 0],
      lastMoveTime: Date.now(),
    });
  };

  const handleNewGame = () => {
    if (settings) {
      setGameState({
        currentPlayer: 0,
        points: [0, 0],
        dots: [],
        lines: [],
        squares: [],
        timeLeft: settings.turnTime,
        totalTime: [0, 0],
        lastMoveTime: Date.now(),
      });
    }
  };

  const handleBack = () => {
    setSettings(null);
  };

  const gameOver = settings ? isGameOver(gameState, settings.gridSize) : false;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {!settings ? (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
            <GameSetup onStart={handleStart} />
          </div>
        ) : (
          <div className="space-y-6">
            <GameControls onNewGame={handleNewGame} onBack={handleBack} />
            
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
              <div className="space-y-6">
                <div className="relative bg-white p-4 rounded-xl shadow-md">
                  <div className="flex justify-between mb-4">
                    <PlayerIndicator 
                      player={0}
                      isActive={gameState.currentPlayer === 0}
                      gameMode={settings.mode}
                    />
                    <PlayerIndicator 
                      player={1}
                      isActive={gameState.currentPlayer === 1}
                      gameMode={settings.mode}
                    />
                  </div>
                  <GameBoard
                    gridSize={settings.gridSize}
                    gameState={gameState}
                    onDotClick={handleDotClick}
                  />
                  {gameOver && (
                    <WinnerDisplay 
                      scores={gameState.points}
                      totalTime={gameState.totalTime}
                      gameMode={settings.mode}
                      onNewGame={handleNewGame}
                    />
                  )}
                </div>
              </div>
              
              <div className="w-80">
                <ScoreBoard
                  scores={gameState.points}
                  currentPlayer={gameState.currentPlayer}
                  timeLeft={gameState.timeLeft}
                  totalTime={gameState.totalTime}
                  gameMode={settings.mode}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;