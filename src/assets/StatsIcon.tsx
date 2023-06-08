interface IProps {
  isSmall?: boolean;
}

export const StatsIcon: React.FC<IProps> = () => {
  return (
    <svg
      fill="none"
      viewBox="0 0 26 25"
      stroke="#634870"
      strokeWidth={1}
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 md:stroke-2 md:w-11 md:h-11"
    >
      <path d="M9 13H1v11h8m0-11V1h8v7m-8 5v11m8-16h8v16h-8m0-16v16m-8 0h8" />
    </svg>
  );
};
