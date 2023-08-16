import { useEffect } from "react";
import { Card } from "./Card";
import { create } from "zustand";
import { useGameStore } from "../App";

interface ICard {
  index: number;
  pictureId: string;
}

interface IFlippedStore {
  flippedCards: ICard[];
  addFlippedCards: (card: ICard) => void;
  resetFlippedCards: () => void;
}

export const useFlippedStore = create<IFlippedStore>((set) => ({
  flippedCards: [],
  addFlippedCards: (card) =>
    set((state) => ({ flippedCards: [...state.flippedCards, card] })),
  resetFlippedCards: () => set(() => ({ flippedCards: [] })),
}));

interface IHiddenStore {
  hiddenCards: ICard[];
  addHiddenCard: (card: ICard) => void;
  resetHiddenCards: () => void;
}

export const useHiddenStore = create<IHiddenStore>((set) => ({
  hiddenCards: [],
  addHiddenCard: (card) =>
    set((state) => ({ hiddenCards: [...state.hiddenCards, card] })),
  resetHiddenCards: () => set(() => ({ hiddenCards: [] })),
}));

interface IGameProps {
  cardsArr: {
    pictureId: string;
    src: string;
  }[];
}

export const Game: React.FC<IGameProps> = ({ cardsArr }) => {
  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const flippedCards = useFlippedStore((state) => state.flippedCards);
  const addHiddenCard = useHiddenStore((state) => state.addHiddenCard);
  const hiddenCards = useHiddenStore((state) => state.hiddenCards);
  const setGameStarted = useGameStore((state) => state.setGameStarted);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const setGameFinished = useGameStore((state) => state.setGameFinished);
  // const gameFinished = useGameStore((state) => state.gameFinished);

  const compareFlippedCards = () => {
    if (!gameStarted && !!flippedCards.length) setGameStarted(true);
    if (flippedCards.length > 1) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];
      if (firstCard.pictureId === secondCard.pictureId) {
        setTimeout(() => {
          addHiddenCard(firstCard);
          addHiddenCard(secondCard);
          if (hiddenCards.length + 2 === cardsArr.length) {
            setGameFinished(true);
            alert("You won!");
          }
        }, 500);
      }
      setTimeout(() => {
        resetFlippedCards();
      }, 800);
    }
  };

  useEffect(() => {
    compareFlippedCards();
  }, [flippedCards]);

  return (
    <div className="px-7 md:px-9 grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
      {cardsArr.map((card, index) => (
        <Card
          key={card.pictureId + index}
          itemIndex={index}
          src={card.src}
          pictureId={card.pictureId}
        />
      ))}
    </div>
  );
};
