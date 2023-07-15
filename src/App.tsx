import { useEffect } from "react";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RestartButton } from "./components/RestartButton";
import { TimeCounter } from "./components/TimeCounter";
import lightning from "./assets/lightning.png";
import leaf from "./assets/leaf.png";
import star from "./assets/star.png";
import heart from "./assets/heart.png";
import cloud from "./assets/cloud.png";
import flower from "./assets/flower.png";
import fish from "./assets/fish.png";
import anchor from "./assets/anchor.png";
import diamond from "./assets/diamond.png";
import moon from "./assets/moon.png";
import fire from "./assets/fire.png";
import sun from "./assets/sun.png";
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
      src: lightning,
    },
    {
      pictureId: "2",
      src: heart,
    },
    {
      pictureId: "3",
      src: leaf,
    },
    {
      pictureId: "4",
      src: star,
    },
    {
      pictureId: "5",
      src: cloud,
    },
    {
      pictureId: "6",
      src: flower,
    },
    {
      pictureId: "7",
      src: fish,
    },
    {
      pictureId: "8",
      src: anchor,
    },
    {
      pictureId: "9",
      src: diamond,
    },
    {
      pictureId: "10",
      src: moon,
    },
    {
      pictureId: "11",
      src: fire,
    },
    {
      pictureId: "12",
      src: sun,
    },
  ];

  const cardsDuplicate = cards.concat(cards);
  const shuffledCards = cardsDuplicate.sort(() => Math.random() - 0.5);

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
