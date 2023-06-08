export const TimeCounter = () => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center rounded-md px-1 py-2 md:px-2 bg-warmGray">
        <span className="hidden md:block text-textGhost font-bold text-sm uppercase">
          Time
        </span>
        <span className="text-textLight font-bold text-lg md:text-2xl">
          00.00
        </span>
      </div>
      <div className="hidden md:flex flex-col items-center rounded-md px-1 py-2 md:px-2 bg-warmGray">
        <span className="text-textGhost font-bold text-sm uppercase">Best</span>
        <span className="text-textLight font-bold text-2xl">00.00</span>
      </div>
    </div>
  );
};
