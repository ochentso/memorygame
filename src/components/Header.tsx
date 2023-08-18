import { useState } from "react";
import { QuestionIcon } from "../assets/QuestionIcon";
import { createPortal } from "react-dom";
import InfoModal from "./InfoModal";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className="flex justify-between py-4 px-7 md:px-9 md:py-6 border-b-2 border-warmGray">
      <h1 className="text-mainPurple font-bold text-2xl md:text-4xl">
        Memory Game
      </h1>
      <div className="flex justify-between gap-2 md:gap-3">
        <button type="button" onClick={() => setIsModalOpen(true)}>
          <QuestionIcon />
        </button>
        {isModalOpen &&
          createPortal(
            <InfoModal onClose={() => setIsModalOpen(false)} />,
            document.body
          )}
      </div>
    </header>
  );
};
