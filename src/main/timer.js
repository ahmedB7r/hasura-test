import React, { useState, useEffect } from "react";

const Timer = props => {
  return (
    <div>
      <h1 style={{ fontSize: 100, marginLeft: 100 }}>
        {props.value}:{props.seconds}
      </h1>
    </div>
  );
};

const TimerQuiz = props => {
  const [seconds, setSeconds] = useState("00");
  const [value, setValue] = useState(props.min);
  let secondsRemaining, intervalHandle;
  let startCountDown;
  const { Stop } = props;
  useEffect(() => {
    startCountDown();
  }, [startCountDown]);
  const tick = () => {
    let min = Math.floor(secondsRemaining / 60);
    let sec = secondsRemaining - min * 60;
    if (min === 0 && sec === 0) {
      Stop();
    }
    setValue(min);
    setSeconds(sec);

    if (Number(sec) < 10) {
      setSeconds("0" + sec);
    }

    if (Number(min) < 10) {
      setValue("0" + min);
    }

    if ((min === 0) & (sec === 0)) {
      clearInterval(intervalHandle);
    }

    secondsRemaining--;
  };

  startCountDown = () => {
    intervalHandle = setInterval(tick, 1000);
    let time = value;
    secondsRemaining = time * 60;
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <Timer value={value} seconds={seconds} />
        </div>
      </div>
    </div>
  );
};

export default TimerQuiz;
