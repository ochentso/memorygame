import { CloseIcon } from "./CloseIcon";

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal = ({ onClose }: InfoModalProps) => {
  return (
    <>
      <div className="fixed z-50 bottom-1/2 right-1/2 translate-x-2/4 translate-y-1/2 py-6 px-6 flex flex-col gap-2 rounded-xl bg-bgYellow w-full md:w-fit">
        <div className="flex justify-between mb-2">
          <span className=" text-xl text-mainPurple font-bold">
            About this game
          </span>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <p className=" text-mainPurple">
          The goal of the game is to clear the board by finding pairs of similar
          cards. The faster you manage to do this, the better — the game keeps
          track of your best time score.
        </p>
        <p className=" text-mainPurple">
          The project is created with Vite, React, Typescript, Zustand and
          Tailwind.
        </p>
        <p className="text-mainPurple">
          You can visit my{" "}
          <a
            href="https://github.com/ochentso"
            target="_blank"
            className=" text-[#814eb5] hover:text-[#3a195c]"
          >
            GitHub
          </a>{" "}
          page our reach out via email: ochentso@gmail.com
        </p>
      </div>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full bg-opacity-20 bg-mainPurple"
      ></div>
    </>
  );
};

export default InfoModal;
