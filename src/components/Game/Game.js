import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import WonBanner from '../WonBanner/WonBanner';
import LostBanner from '../LostBanner/LostBanner';
import Keyboard from '../Keyboard/Keyboard';

function Game() {

  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('running')

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess]
    setGuesses(nextGuesses);
    
    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won');
    }
    if(nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost')
    }
  }

  function handleRestart() {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer)
    setGuesses([]);
    setGameStatus('running');
  }

  const validatedGuesses = guesses.map((guess) => 
    checkGuess(guess, answer)
  )

  return (
    <>
      <GuessResults validatedGuesses={validatedGuesses} />
      <Keyboard validatedGuesses={validatedGuesses}/>
      <GuessInput
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
      />
      {gameStatus === 'won' && (
        <WonBanner
          numOfGuesses={guesses.length}
          handleRestart={handleRestart}
        />
      )}
      {gameStatus === 'lost' && (
        <LostBanner
          answer={answer}
          handleRestart={handleRestart}
        />
      )}

    </>
  );
}

export default Game;