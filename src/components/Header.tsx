import { useState } from "react";
import { QuestionIcon } from "../assets/QuestionIcon";
import { createPortal } from "react-dom";
import InfoModal from "./InfoModal";
import { RestartButton } from "./RestartButton";
import { TimeCounter } from "./TimeCounter";

interface IHeaderProps {
  handleRestartGame: () => void;
}

export const Header: React.FC<IHeaderProps> = ({ handleRestartGame }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex justify-between flex-wrap md:flex-nowrap py-4 px-7 md:px-9 md:py-6 gap-3">
      <div className="flex items-center gap-3 w-full md:w-fit justify-between md:justify-start">
        <h1 className="text-mainPurple font-bold text-2xl md:text-4xl">
          Memory Game
        </h1>
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <QuestionIcon />
        </button>
      </div>
      <div className="flex justify-between gap-2 md:gap-3 w-full md:w-fit">
        <RestartButton onClick={handleRestartGame} />
        <TimeCounter />
        {isModalOpen &&
          createPortal(
            <InfoModal onClose={() => setIsModalOpen(false)} />,
            document.body
          )}
      </div>
    </header>
  );
};
