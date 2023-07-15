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
  addHiddenCard: (card: ICard) => void;
}

export const useHiddenStore = create<IHiddenStore>((set) => ({
  hiddenCards: [],
  addHiddenCard: (card) =>
    set((state) => ({ hiddenCards: [...state.hiddenCards, card] })),
}));

const cards = [
  {
    pictureId: "a",
    src: lightning,
  },
  {
    pictureId: "b",
    src: heart,
  },
  {
    pictureId: "c",
    src: leaf,
  },
  {
    pictureId: "d",
    src: star,
  },
  {
    pictureId: "e",
    src: cloud,
  },
  {
    pictureId: "f",
    src: flower,
  },
  {
    pictureId: "g",
    src: fish,
  },
  {
    pictureId: "h",
    src: anchor,
  },
  {
    pictureId: "i",
    src: diamond,
  },
  {
    pictureId: "j",
    src: moon,
  },
  {
    pictureId: "k",
    src: fire,
  },
  {
    pictureId: "l",
    src: sun,
  },
];

const cardsDuplicate = cards.concat(cards);
const shuffledCards = cardsDuplicate.sort(() => Math.random() - 0.5);

function App() {
  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const flippedCards = useFlippedStore((state) => state.flippedCards);
  const addHiddenCard = useHiddenStore((state) => state.addHiddenCard);
  const hiddenCards = useHiddenStore((state) => state.hiddenCards);

  const compareFlippedCards = () => {
    if (flippedCards.length > 1) {
      const firstCard = flippedCards[0];
      const secondCard = flippedCards[1];
      if (firstCard.pictureId === secondCard.pictureId) {
        setTimeout(() => {
          addHiddenCard(firstCard);
          addHiddenCard(secondCard);
          hiddenCards.length + 2 === shuffledCards.length && alert("You won!");
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
    <>
      <Header />
      <div className="py-4 px-7 md:px-9 md:py-6 flex justify-between items-center">
        <RestartButton />
        <TimeCounter />
      </div>
      <div className="px-7 md:px-9 grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
        {shuffledCards.map((card, index) => (
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
