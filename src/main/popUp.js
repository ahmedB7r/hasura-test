import React, { useState } from "react";
import Result from "./result";
const Popup = props => {
  const { total, style } = props;
  const [score, setScore] = useState(0);
  const popupHandle = () => {
    props.history.push("/");
  };
  const incScore = b => {
    setScore(b);
  };
  return (
    <div className="popup-container" style={style}>
      <div className="container">
        <div className="col-md-8 col-md-offset-2">
          <div className="popup">
            <h1>Welcome to Quizz</h1>
            <p>
              You have completed the quiz. <br /> You got:
              <strong>{score}</strong> out of <strong>{total}</strong>
              questions right.
            </p>
            <Result incScore={incScore} />

            <button type="button" className="fancy-btn" onClick={popupHandle}>
              test anthor one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
