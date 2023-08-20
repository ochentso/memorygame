import { formatTime, useTimerStore } from "../App";

export const TimeCounter = () => {
  const timer = useTimerStore((state) => state.timer);
  const bestTime = useTimerStore((state) => state.bestTime);

  const formattedCurrentTime = formatTime(timer);
  const formattedBestTime = formatTime(bestTime);
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center rounded-md px-1 py-2 md:px-2 bg-warmGray">
        <span className="hidden md:block text-textGhost font-bold text-sm uppercase">
          Time
        </span>
        <span className="text-textLight font-bold text-lg md:text-2xl">
          {formattedCurrentTime}
        </span>
      </div>
      <div className="flex flex-col items-center rounded-md px-1 py-2 md:px-2 bg-warmGray">
        <span className="hidden md:block text-textGhost font-bold text-sm uppercase">
          Best
        </span>
        <span className="text-textLight font-bold text-lg md:text-2xl">
          {formattedBestTime}
        </span>
      </div>
    </div>
  );
};
