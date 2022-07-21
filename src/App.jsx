import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "use-timer";
import { randomeStreamGenerator } from "./components/stream";
import useKeyPress from "./components/useKeyPress";
import "./App.css";

let stream = randomeStreamGenerator();

const App = () => {
  const inputRef = useRef(null);
  const [outgoingChar, setOutgoingChar] = useState("");
  const [currentChar, setCurrentChar] = useState(stream.charAt(0));
  const [upcomingChar, setUpcomingChar] = useState(stream.substring(1));
  const [score, setScore] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.highScore);
  const [input, setInput] = useState(keyPress);
  const { time, start, pause, reset, advanceTime } = useTimer({ interval: 20, step: 20, });

  const resetFn = () => {
    stream = randomeStreamGenerator();
    setOutgoingChar("");
    setCurrentChar(stream.charAt(0));
    setUpcomingChar(stream.substring(1));
    setScore(0);
    setIsTimerRunning(false);
    reset();
  };

  let keyPress = useKeyPress((key) => {
    let copyOutgoingChar = outgoingChar;
    let copyUpcomingChar = upcomingChar;

    if (score === 0 || !isTimerRunning) {
      start();
      setIsTimerRunning(true);
    }

    if (key.toUpperCase() === currentChar) {
      setScore(score + 1);

      copyOutgoingChar += currentChar;
      setOutgoingChar(copyOutgoingChar);

      if (upcomingChar.length !== 0) {
        setCurrentChar(upcomingChar.charAt(0));

        copyUpcomingChar = upcomingChar.substring(1);
        setUpcomingChar(copyUpcomingChar);
      } else {
        if (time == 0) {
          resetFn();
          return;
        }
        setCurrentChar(score == 19 ? "Success!" : "Fail!");
        pause();
        if (
          (highScore == 0 && score == 19) ||
          (score == 19 && time < highScore)
        ) {
          localStorage.highScore = JSON.stringify(time);
        }
        setHighScore(localStorage.highScore);
        reset();
      }
    } else if (!upcomingChar == "") {
      setScore(score - 1);
      advanceTime(400);
    } else {
      resetFn();
    }
  });
  const ttime = time / 1000;
  const hhighscore = highScore / 1000;

  return (
    <div className="App">

      {/* HERO section starts */}
      <div className="heading">
        <h1>Type the alphabet</h1><br />
        <p>Typing game to see how fast you type. Timer starts when you do :)</p><br />
      </div>
      <div className="display">{currentChar}</div><br />
      {/* HERO section ends */}

      {/* TIMER section starts */}
      <div className="timer">
        <div >
          <span><b>Time : </b></span>
          <span>{ttime.toFixed(2)} sec</span>
        </div><br />
        <div >
          <span><b>Best time : </b></span>
          <span>{hhighscore.toFixed(2)} sec !</span>
        </div><br />
      </div>
      {/* TIMER section ends */}

      {/* INPUT FIELD & RESET starts here */}
      <div className="input-div">
        <input
          type="text"
          ref={inputRef}
          className="input-box"
          placeholder="type here"
          onChange={(event) => setInput(input + keyPress)}
        />
        <button className="reset" onClick={resetFn}>
          Reset
        </button>
      </div>
      {/* iNPUT field ends */}

    </div>
  );
};

export default App;
