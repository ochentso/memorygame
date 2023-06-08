import { QuestionIcon } from "../assets/QuestionIcon";
import { StatsIcon } from "../assets/StatsIcon";

export const Header = () => {
  return (
    <header className="flex justify-between py-4 px-7 md:px-9 md:py-6 border-b-2 border-warmGray">
      <h1 className="text-mainPurple font-bold text-2xl md:text-4xl">
        Memory Game
      </h1>
      <div className="flex justify-between gap-2 md:gap-3">
        <button type="button">
          <StatsIcon />
        </button>
        <button type="button">
          <QuestionIcon />
        </button>
      </div>
    </header>
  );
};
