import { useState, useEffect, useCallback } from 'react';
import { GameSettings, GameState, Point } from '../types/game';
import { checkForSquare, getSquareLines } from '../utils/gameLogic';
import { makeComputerMove } from '../utils/computerAI';
import { isDotPlaced } from '../utils/gameUtils';

const initialGameState: GameState = {
  currentPlayer: 0,
  points: [0, 0],
  dots: [],
  lines: [],
  squares: [],
  timeLeft: 0,
  totalTime: [0, 0],
  lastMoveTime: Date.now(),
};

export function useGameState(settings: GameSettings | null) {
  const [gameState, setGameState] = useState<GameState>({
    ...initialGameState,
    timeLeft: settings?.turnTime || 0,
  });

  // Timer effect
  useEffect(() => {
    if (!settings || settings.mode === 'single' && gameState.currentPlayer === 1) {
      return;
    }

    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [settings, gameState.currentPlayer]);

  // Auto-switch turns when time runs out
  useEffect(() => {
    if (!settings || gameState.timeLeft > 0 || (settings.mode === 'single' && gameState.currentPlayer === 1)) {
      return;
    }

    const currentTime = Date.now();
    const timeTaken = currentTime - gameState.lastMoveTime;
    const newTotalTime = [...gameState.totalTime];
    newTotalTime[gameState.currentPlayer] += timeTaken;

    setGameState(prev => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
      timeLeft: settings.turnTime,
      totalTime: newTotalTime,
      lastMoveTime: currentTime,
    }));
  }, [gameState.timeLeft, settings, gameState.currentPlayer, gameState.lastMoveTime, gameState.totalTime]);

  const handleDotClick = useCallback((point: Point) => {
    if (!settings || !point || isDotPlaced(gameState.dots, point)) {
      return;
    }

    const currentTime = Date.now();
    const timeTaken = currentTime - gameState.lastMoveTime;
    const newTotalTime = [...gameState.totalTime];
    newTotalTime[gameState.currentPlayer] += timeTaken;

    const newDot = { ...point, player: gameState.currentPlayer };
    const newDots = [...gameState.dots, newDot];
    const square = checkForSquare(newDots, point);

    let newState: Partial<GameState> = {
      dots: newDots,
      currentPlayer: gameState.currentPlayer === 0 ? 1 : 0,
      timeLeft: settings.turnTime,
      totalTime: newTotalTime,
      lastMoveTime: currentTime,
    };

    if (square) {
      const squareLines = getSquareLines(square);
      newState = {
        ...newState,
        squares: [...gameState.squares, square],
        lines: [...gameState.lines, ...squareLines],
        points: gameState.points.map((p, i) => 
          i === gameState.currentPlayer ? p + 1 : p
        ),
        currentPlayer: gameState.currentPlayer, // Keep turn if square completed
        timeLeft: settings.turnTime, // Reset timer when scoring
      };
    }

    setGameState(prev => ({ ...prev, ...newState }));
  }, [gameState, settings]);

  useEffect(() => {
    if (settings?.mode === 'single' && gameState.currentPlayer === 1) {
      const timer = setTimeout(() => {
        const computerMove = makeComputerMove(gameState, settings.gridSize);
        if (computerMove) {
          handleDotClick(computerMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, settings, handleDotClick]);

  return {
    gameState,
    setGameState,
    handleDotClick,
  };
}