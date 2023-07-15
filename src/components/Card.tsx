import { useContext, useEffect, useId, useState } from "react";
import { useFlippedStore, useHiddenStore } from "../App";

interface ICardProps {
  itemIndex: number;
  isHiddenArr?: string[];
  src: string;
  pictureId: string;
}

export const Card = ({
  itemIndex,
  src,
  isHiddenArr,
  pictureId,
}: ICardProps) => {
  const cardId = useId();

  const addFlippedCards = useFlippedStore((state) => state.addFlippedCards);
  const flippedCards = useFlippedStore((state) => state.flippedCards);

  const foundFlippedCard = flippedCards?.find(
    (card) => card.index === itemIndex
  );
  const isFlipped = foundFlippedCard ? true : false;

  const hiddenCards = useHiddenStore((state) => state.hiddenCards);

  const foundHiddenCard = hiddenCards?.find((card) => card.index === itemIndex);
  const isHidden = foundHiddenCard ? true : false;

  const handleClick = () => {
    if (flippedCards.length > 1) return;
    if (flippedCards.find((card) => card.index === itemIndex)) return;
    addFlippedCards({
      index: itemIndex,
      pictureId: pictureId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${
        isHidden ? "invisible" : "visible"
      } relative [perspective:1000px] w-auto h-24 md:h-36 lg:h-48`}
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform ease-in-out delay-200 duration-500 [transformStyle:preserve-3d]"
        style={{
          transform: isFlipped ? "rotateY( 180deg )" : "rotateY(0)",
        }}
      >
        <div className="absolute inset-0 bg-cardBack h-full w-full rounded-xl [backfaceVisibility:hidden] px-2 py-4"></div>
        <div className="absolute inset-0 bg-violet-200 h-full w-full rounded-xl [backfaceVisibility:hidden] [transform:rotateY(180deg)] px-2 py-4">
          <img src={src} alt="" className="object-contain w-full h-full" />
        </div>
      </div>
    </button>
  );
};
