import React, { useEffect, Fragment } from "react";

const Answers = props => {
  let { form, setForm, setIsAnswered, answers, questionId } = props;

  useEffect(() => {
    setIsAnswered(false);
  }, [props.answers, setIsAnswered]);
  const checkAnswer = e => {
    setIsAnswered(true);
  };

  return (
    <div className="answers">
      <ul>
        {answers.map(({ answer, id }, index) => {
          if (Number(form[questionId]) === id) setIsAnswered(true);
          return (
            <Fragment key={index}>
              <input
                className="form-check-input d-none"
                type="radio"
                name={questionId}
                id={id}
                value={id}
                onChange={e => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value
                  });
                }}
                checked={Number(form[questionId]) === id}
              />
              <label onClick={checkAnswer} data-id={index} htmlFor={id}>
                <span>{index + 1}</span> <p>{answer} </p>
              </label>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Answers;
