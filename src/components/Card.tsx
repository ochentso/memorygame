import { useState } from "react";
import { StarIcon } from "../assets/StarIcon";

export const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative [perspective:1000px] w-auto h-24 md:h-36 lg:h-48"
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform ease-in-out delay-200 duration-500 [transformStyle:preserve-3d]"
        style={{
          transform: isFlipped ? "rotateY( 180deg )" : "rotateY(0)",
        }}
      >
        <div className="absolute inset-0 bg-cardBack h-full w-full rounded-xl [backfaceVisibility:hidden] px-2 py-4">
          <span>back</span>
        </div>
        <div className="absolute inset-0 bg-violet-200 h-full w-full rounded-xl [backfaceVisibility:hidden] [transform:rotateY(180deg)] px-2 py-4">
          <StarIcon />
        </div>
      </div>
    </button>
  );
};
