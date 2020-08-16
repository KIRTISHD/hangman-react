import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import {showNotification as show} from './helpers/helpers';

import data from './data/data.json';

import './App.scss';

// const words = ['application', 'programming', 'interface', 'wizard'];
//let selectedWord = words[Math.floor(Math.random() * words.length)];
//console.log(selectedWord);

let randomObject = data[Math.floor(Math.random() * data.length)];
let originalWord = randomObject['word'].toLowerCase();
let selectedWord = originalWord.split(" ").join("");
let hintWord = randomObject['year'];


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode } = event;
      if (playable && ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    //Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    // const random = Math.floor(Math.random() * words.length);
    // selectedWord = words[random];
    randomObject = data[Math.floor(Math.random() * data.length)];
    originalWord = randomObject['word'].toLowerCase();
    selectedWord = originalWord.split(" ").join("");
    hintWord = randomObject['year'];
  }

  return (
    <>
      <Header hintWord={hintWord}/>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} originalWord={originalWord}/>
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters}
        selectedWord={selectedWord} setPlayable={setPlayable}
        playAgain={playAgain} originalWord={originalWord}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
