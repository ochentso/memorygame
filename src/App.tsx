import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Game, useFlippedStore, useHiddenStore } from "./components/Game";
import { picturesSet } from "./consts";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

const picsDuplicate = picturesSet.concat(picturesSet);

const picsShuffled = picsDuplicate.sort(() => Math.random() - 0.5);

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutesStr}:${secondsStr}`;
};

interface IGameStore {
  gameStarted: boolean;
  setGameStarted: (value: boolean) => void;
  gameFinished: boolean;
  setGameFinished: (value: boolean) => void;
}

export const useGameStore = create<IGameStore>((set) => ({
  gameStarted: false,
  setGameStarted: (value) => set(() => ({ gameStarted: value })),
  gameFinished: false,
  setGameFinished: (value) => set(() => ({ gameFinished: value })),
}));

export const useTimerStore = create<ITimerStore>((set) => ({
  timer: 0,
  incrementTimer: () => set((state) => ({ timer: state.timer + 1 })),
  resetTimer: () => set(() => ({ timer: 0 })),
  lastTime: "",
  setLastTime: (value) => set(() => ({ lastTime: value })),
  bestTime: Number(localStorage.getItem("bestTime")) || 0,
  setBestTime: (value) => set(() => ({ bestTime: value })),
}));

interface ITimerStore {
  timer: number;
  incrementTimer: () => void;
  resetTimer: () => void;
  lastTime: string;
  setLastTime: (value: string) => void;
  bestTime: number;
  setBestTime: (value: number) => void;
}

function App() {
  const [cards, setCards] = useState(picsShuffled);
  // const [bestTime, setBestTime] = useState(
  //   Number(localStorage.getItem("bestTime")) || 0
  // );

  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const resetHiddenCards = useHiddenStore((state) => state.resetHiddenCards);
  const setGameStarted = useGameStore((state) => state.setGameStarted);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const gameFinished = useGameStore((state) => state.gameFinished);
  const setLastTime = useTimerStore((state) => state.setLastTime);
  const setBestTime = useTimerStore((state) => state.setBestTime);
  const setGameFinished = useGameStore((state) => state.setGameFinished);

  const restartNewGame = () => {
    resetFlippedCards();
    resetHiddenCards();
    setGameStarted(false);
    setGameFinished(false);
    setCards(picsDuplicate.sort(() => Math.random() - 0.5));
  };

  const timer = useTimerStore((state) => state.timer);
  const incrementTimer = useTimerStore((state) => state.incrementTimer);
  const resetTimer = useTimerStore((state) => state.resetTimer);
  const intervalRef = useRef(0);
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      incrementTimer();
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(intervalRef.current);
    resetTimer();
  };

  useEffect(() => {
    if (!gameStarted) {
      if (timer !== 0) {
        stopTimer();
      }
      return;
    }
    startTimer();
  }, [gameStarted]);

  useEffect(() => {
    if (gameFinished) {
      const savedTime = localStorage.getItem("bestTime");
      setLastTime(formatTime(timer));
      if (savedTime) {
        localStorage.setItem(
          "bestTime",
          `${Math.min(timer, Number(savedTime))}`
        );
        setBestTime(Math.min(timer, Number(savedTime)));
      } else {
        localStorage.setItem("bestTime", `${timer}`);
        setBestTime(timer);
      }
      stopTimer();
    }
  }, [gameFinished]);

  return (
    <>
      <Header handleRestartGame={restartNewGame} />

      <Game cardsArr={cards} />
      <Footer />
    </>
  );
}

export default App;
