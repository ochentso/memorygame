import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { RestartButton } from "./components/RestartButton";
import { TimeCounter } from "./components/TimeCounter";
import { Game, useFlippedStore, useHiddenStore } from "./components/Game";
import { picturesSet } from "./consts";
import { useState } from "react";

const picsDuplicate = picturesSet.concat(picturesSet);

function App() {
  const [cards, setCards] = useState(
    picsDuplicate.sort(() => Math.random() - 0.5)
  );

  const [gameStarted, setGameStarted] = useState(false);

  const resetFlippedCards = useFlippedStore((state) => state.resetFlippedCards);
  const resetHiddenCards = useHiddenStore((state) => state.resetHiddenCards);

  const handleStartGame = () => {
    setGameStarted(true);
    console.log("game started");
    // start timer
  };

  const restartNewGame = () => {
    resetFlippedCards();
    resetHiddenCards();
    setGameStarted(false);
    setCards(picsDuplicate.sort(() => Math.random() - 0.5));
    // reset timer
  };

  return (
    <>
      <Header />
      <div className="py-4 px-7 md:px-9 md:py-6 flex justify-between items-center">
        <RestartButton onClick={restartNewGame} />
        <TimeCounter />
      </div>
      <Game
        cardsArr={cards}
        // gameStarted={gameStarted}
        // setGameStarted={handleStartGame}
      />
      <Footer />
    </>
  );
}

export default App;
