import React, { Fragment, useEffect } from "react";
import { useStateValue } from "../stateManage";
import classnames from "classnames";

const Result = props => {
  const [{ chosenAns, questions }] = useStateValue();
  const { incScore } = props;
  let b = 0;

  useEffect(() => {
    if (b !== 0) incScore(b);
  }, [b, incScore]);
  return (
    <div className="answers">
      {questions.map(({ id, correct, question, answers }) => {
        const questionId = id;
        return (
          <Fragment key={id}>
            <h1> {question} </h1>
            <ul>
              {answers.map(({ id, answer }, index) => {
                if (Number(chosenAns[questionId]) === id && correct === index)
                  b++;

                return (
                  <li
                    data-id={index}
                    key={id}
                    className={classnames(`li`, {
                      wrong:
                        Number(chosenAns[questionId]) === id &&
                        correct !== index,
                      right:
                        (Number(chosenAns[questionId]) === id &&
                          correct === index) ||
                        correct === index
                    })}
                  >
                    <span>{index + 1}</span>
                    <p>{answer}</p>
                  </li>
                );
              })}
            </ul>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Result;
