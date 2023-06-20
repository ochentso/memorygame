import { useEffect } from "react";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RestartButton } from "./components/RestartButton";
import { TimeCounter } from "./components/TimeCounter";
import froggoUrl from "./assets/froggo.png";
import reactLogo from "./assets/react.svg";
import { create } from "zustand";

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
  addHiddenCards: (card: ICard) => void;
}

export const useHiddenStore = create<IHiddenStore>((set) => ({
  hiddenCards: [],
  addHiddenCards: (card) =>
    set((state) => ({ hiddenCards: [...state.hiddenCards, card] })),
}));

function App() {
  const cards = [
    {
      pictureId: "1",
      src: froggoUrl,
    },
    {
      pictureId: "2",
      src: "/vite.svg",
    },
    {
      pictureId: "3",
      src: reactLogo,
    },
  ];

  const cardsDuplicate = cards.concat(cards);

  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const flippedCards = useFlippedStore((state) => state.flippedCards);
  const addHiddenCards = useHiddenStore((state) => state.addHiddenCards);

  const compareFlippedCards = () => {
    if (flippedCards.length > 1) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];
      if (firstCard.pictureId === secondCard.pictureId) {
        console.log("match");
        setTimeout(() => {
          addHiddenCards(firstCard);
          addHiddenCards(secondCard);
        }, 1000);
      }
      setTimeout(() => {
        resetFlippedCards();
      }, 1000);
    }
  };

  useEffect(() => {
    compareFlippedCards();
  }, [flippedCards]);

  return (
    <>
      <Header />
      <div className="py-4 px-7 md:px-9 md:py-6 flex justify-between items-center">
        <RestartButton />
        <TimeCounter />
      </div>
      <div className="px-7 md:px-9 grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
        {cardsDuplicate.map((card, index) => (
          <Card
            key={card.pictureId + index}
            itemIndex={index}
            src={card.src}
            pictureId={card.pictureId}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
