import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RestartButton } from "./components/RestartButton";
import { TimeCounter } from "./components/TimeCounter";
import { Game, useFlippedStore, useHiddenStore } from "./components/Game";
import { picturesSet } from "./consts";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

const picsDuplicate = picturesSet.concat(picturesSet);

const picsShuffled = picsDuplicate.sort(() => Math.random() - 0.5);

interface IGameStore {
  gameStarted: boolean;
  setGameStarted: (value: boolean) => void;
}

export const useGameStore = create<IGameStore>((set) => ({
  gameStarted: false,
  setGameStarted: (value) => set(() => ({ gameStarted: value })),
}));

const useTimerStore = create<ITimerStore>((set) => ({
  timer: 0,
  incrementTimer: () => set((state) => ({ timer: state.timer + 1 })),
  resetTimer: () => set(() => ({ timer: 0 })),
}));

interface ITimerStore {
  timer: number;
  incrementTimer: () => void;
  resetTimer: () => void;
}

function App() {
  const [cards, setCards] = useState(picsShuffled);

  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const resetHiddenCards = useHiddenStore((state) => state.resetHiddenCards);
  const setGameStarted = useGameStore((state) => state.setGameStarted);
  const gameStarted = useGameStore((state) => state.gameStarted);

  const restartNewGame = () => {
    resetFlippedCards();
    resetHiddenCards();
    setGameStarted(false);
    setCards(picsDuplicate.sort(() => Math.random() - 0.5));
  };

  const timer = useTimerStore((state) => state.timer);
  const incrementTimer = useTimerStore((state) => state.incrementTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const intervalRef = useRef(0);
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      incrementTimer();
      console.log("timer", timer);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    resetTimer();
  };

  useEffect(() => {
    console.log("gameStarted", gameStarted);
    if (!gameStarted) {
      if (timer !== 0) {
        stopTimer();
      }
      return;
    }
    startTimer();
  }, [gameStarted]);

  return (
    <>
      <Header />
      <div className="py-4 px-7 md:px-9 md:py-6 flex justify-between items-center">
        <RestartButton onClick={restartNewGame} />
        <TimeCounter />
        <span>{timer}</span>
      </div>
      <Game cardsArr={cards} />
      <Footer />
    </>
  );
}

export default App;
