import React, { useState } from "react";
import "./App.css";
import levels from "./levels.js";
import ProgressBar from "./progress.js";
import arrowImages from "./arrows.js";
import outputImages from "./outputImage.js";

const App = () => {
  const [level, setLevel] = useState(0);
  const [arrowIndex, setArrowIndex] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const initialFormData = {
    hours: "",
    minutes: "",
    seconds: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const safeGetInt = (string) => {
    if (string === "") {
      return 0;
    } else {
      if (isNaN(parseInt(string))) {
        return -1;
      } else {
        return parseInt(string);
      }
    }
  };
  const getSeconds = (data) => {
    const { hours, minutes, seconds } = data;
    return (
      safeGetInt(hours) * 60 * 60 +
      safeGetInt(minutes) * 60 +
      safeGetInt(seconds)
    );
  };
  const outputMessage = (attempts) => {
    if (0 <= attempts && attempts <= 3) {
      return (
        <div>
          <p className="attempts"> Total Attempts Taken: {attempts}</p>
          <h2 className="status">Status: Genius</h2>
          <br />
          <p className="verdict">
            {" "}
            BRILLIANT KNOWLEDGE IN WORLD RECORD TIMES!!
          </p>
          <img className="outputImage" src={outputImages[0]} alt="" />
        </div>
      );
    } else if (4 <= attempts && attempts <= 6) {
      return (
        <div>
          <p className="attempts"> Total Attempts Taken: {attempts}</p>
          <h2 className="">Status: Genius</h2>
          <br />
          <p className="verdict">
            {" "}
            BRILLIANT KNOWLEDGE IN WORLD RECORD TIMES!!
          </p>
          <img className="outputImage" src={outputImages[1]} alt="" />
        </div>
      );
    } else if (7 <= attempts && attempts <= 11) {
      return (
        <div>
          <p className="attempts"> Total Attempts Taken: {attempts}</p>
          <h2 className="">Status: Genius</h2>
          <br />
          <p className="verdict">
            {" "}
            BRILLIANT KNOWLEDGE IN WORLD RECORD TIMES!!
          </p>
          <img className="outputImage" src={outputImages[2]} alt="" />
        </div>
      );
    } else if (12 <= attempts && attempts <= 15) {
      return (
        <div>
          <p className="attempts"> Total Attempts Taken: {attempts}</p>
          <h2 className="">Status: Genius</h2>
          <br />
          <p className="verdict">
            {" "}
            BRILLIANT KNOWLEDGE IN WORLD RECORD TIMES!!
          </p>
          <img className="outputImage" src={outputImages[3]} alt="" />
        </div>
      );
    } else {
      return (
        <div>
          <p className="attempts"> Total Attempts Taken: {attempts}</p>
          <h2 className="">Status: Genius</h2>
          <br />
          <p className="verdict">
            {" "}
            BRILLIANT KNOWLEDGE IN WORLD RECORD TIMES!!
          </p>
          <img className="outputImage" src={outputImages[4]} alt="" />
        </div>
      );
    }
  };
  const nextLevel = (e) => {
    console.log(formData);
    console.log(level);
    e.preventDefault();
    const seconds = getSeconds(formData);
    console.log(seconds);
    if (seconds < 0) {
      setArrowIndex((arrowIndex) => 3);
    } else if (seconds === levels[level].answer) {
      setFormData(initialFormData);
      if (level === levels.length - 1) {
        setGameEnded(true);
        return;
      }
      setLevel((oldLevel) => oldLevel + 1);
      setArrowIndex((arrowIndex) => 0);
    } else if (seconds > levels[level].answer) {
      setArrowIndex((arrowIndex) => 2);
      setAttempts((attempts) => attempts + 1);
    } else {
      setArrowIndex((arrowIndex) => 1);
      setAttempts((attempts) => attempts + 1);
    }
  };
  return (
    <div className="App">
      {gameEnded === true ? (
        <div className="outputMessage">
          <h1 className="output-title">Quiz Completed</h1>
          <br />
          {outputMessage(attempts)}
          <p className="name"> By Geoffrey Lee</p>
          <a
            className="git"
            href="https://github.com/LGeoff31/event-guesser"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            GitHub{" "}
          </a>
        </div>
      ) : (
        <div>
          <h1 className="title"> World Record Times</h1>
          <p className="attempts right"> Total Attempts: {attempts} </p>
          <div className="level">
            <p className="attempts">
              {" "}
              Level: {level + 1}/{levels.length}
            </p>
            <ProgressBar
              bgcolor="#00695c"
              completed={(level / levels.length) * 100}
            />
          </div>

          <div className="center">
            <div>
              <h3 className="instruction"> Instructions</h3>
              <ul className="rules">
                <li> Enter the World Record Time of the Track Event</li>
                <li>
                  {" "}
                  If the time entered is incorrect, an arrow will guide you in
                  the direction to the record time
                </li>
                <li>
                  {" "}
                  Try to complete this game in the least number of attempts!
                </li>
                <li> Good Luck!</li>
              </ul>
            </div>
            <div>
              <h2 className="athlete-name">
                {" "}
                {levels[level].name} {levels[level].event}{" "}
              </h2>
              <img className="image" src={levels[level].image} alt="" />
            </div>
            <div className="display">
              <h3 className="display-status">Higher or Lower</h3>
              <img
                className="arrowImage"
                src={arrowImages[arrowIndex]}
                alt=""
              />
            </div>
          </div>

          <form className="input" onSubmit={(e) => nextLevel(e)}>
            <div>
              <p className="times">Hours</p>
              <input
                className="box"
                value={formData.hours}
                type="text"
                placeholder="0"
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
              />
            </div>
            <div>
              <p className="times">Minutes</p>
              <input
                className="box"
                value={formData.minutes}
                type="text"
                placeholder="0"
                onChange={(e) =>
                  setFormData({ ...formData, minutes: e.target.value })
                }
              />
            </div>
            <div>
              <p className="times">Seconds</p>
              <input
                className="box"
                value={formData.seconds}
                type="text"
                placeholder="0"
                onChange={(e) =>
                  setFormData({ ...formData, seconds: e.target.value })
                }
              />
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
          <p className="name"> By Geoffrey Lee</p>
        </div>
      )}
    </div>
  );
};

export default App;
