import { CloseIcon } from "./CloseIcon";
import { useTimerStore } from "../App";

interface WinModalProps {
  onClose: () => void;
}

const WinModal = ({ onClose }: WinModalProps) => {
  const lastTime = useTimerStore((state) => state.lastTime);
  return (
    <>
      <div className="fixed z-50 bottom-1/2 right-1/2 translate-x-2/4 translate-y-1/2 flex flex-col items-center pb-6 pt-8 px-6 rounded-xl bg-bgYellow w-fit">
        <button onClick={onClose} className=" absolute top-1 right-1">
          <CloseIcon />
        </button>
        <div className="flex justify-between gap-14">
          <span className=" text-mainPurple font-bold text-4xl">
            You win!🎉
          </span>
        </div>
        <span className=" text-mainPurple font-bold text-xl text-center">
          Your time was: {lastTime}
        </span>
      </div>
      <div
        onClick={onClose}
        className="fixed top-0 left-0 w-full h-full bg-opacity-20 bg-mainPurple"
      ></div>
    </>
  );
};

export default WinModal;
