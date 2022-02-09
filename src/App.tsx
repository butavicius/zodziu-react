import React, { useState } from "react";
import Board from "./components/Board";
import Card from "./components/Card";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import Layout from "./components/Layout";
import Results from "./components/Results";
import Rules from "./components/Rules";
import { targetWord, gameNumber } from "./gameSetup";

function App() {
  const [lettersExhausted, setLettersExhausted] = useState<string[]>([]);
  const [endGameState, setEndGameState] = useState<string[] | undefined>();
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(true);

  const isGameOver = !!endGameState;

  if (endGameState) console.log("sveikinu", endGameState);

  return (
    <Layout>
      <Header onClick={() => setIsRulesOpen(true)} />
      <Board
        targetWord={targetWord}
        onGameEnd={setEndGameState}
        onLettersExhausted={setLettersExhausted}
      />
      <Keyboard lettersDisabled={lettersExhausted} />
      <Card isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)}>
        <Rules />
      </Card>
      {isGameOver && (
        <Card isOpen={isResultsOpen} onClose={() => setIsResultsOpen(false)}>
          <Results
            endGameState={endGameState}
            targetWord={targetWord}
            gameNumber={gameNumber}
          />
        </Card>
      )}
    </Layout>
  );
}

export default App;
