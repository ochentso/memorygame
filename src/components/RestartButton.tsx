interface IRestartButtonProps {
  onClick: () => void;
}

export const RestartButton: React.FC<IRestartButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-textLight font-bold text-lg md:text-2xl bg-dustyRose hover:bg-[#d5aea1] active:bg-[#cd9e90] rounded-md p-2 md:p-3"
    >
      New game
    </button>
  );
};
