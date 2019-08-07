import React, { useState, useEffect } from "react";
import Answers from "./answers";
import Popup from "./popUp";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import { useStateValue } from "../stateManage";
import TimerQuiz from "./timer";
const ALL_QUESTIONS_QUERY = gql`
  query ALL_QUESTIONS_QUERY($id: Int) {
    exam(where: { id: { _eq: $id } }) {
      questions {
        id
        answers {
          answer
          id
        }
        correct
        question
      }
    }
  }
`;

const Exam = props => {
  const [nr, setNr] = useState(0);

  const [total, setTotal] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  const [displayPopup, setDisplayPopup] = useState("none");
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [, dispatch] = useStateValue();
  const [form, setForm] = useState({});

  const { data = {}, error, loading } = useQuery(ALL_QUESTIONS_QUERY, {
    variables: {
      id: props.match.params.id
    }
  });

  useEffect(() => {
    if (data && data.exam) {
      setTotal(data.exam[0].questions.length);
      setQuestion(data.exam[0].questions[nr].question);
      setAnswers(data.exam[0].questions[nr].answers);
      setCorrect(data.exam[0].questions[nr].correct);
    }
  }, [data, nr]);
  useEffect(() => {
    if (data && data.exam) {
      dispatch({
        type: "questions",
        questions: data.exam[0].questions
      });
    }
  }, [data, dispatch]);
  useEffect(() => {
    if (form)
      dispatch({
        type: "changeChosenAns",
        chosenAns: form
      });
  }, [dispatch, form]);

  if (error) console.log(error);
  if (loading) return <h1 style={{ textAlign: "center" }}> Loading </h1>;

  const skip = () => {
    if (questionAnswered) {
      let copyForm = { ...form };
      delete copyForm[data.exam[0].questions[nr].id];
      setForm(copyForm);
      setQuestionAnswered(false);
    } else {
      setNr(nr + 1);
    }
  };
  const prevQuestion = () => {
    setNr(nr - 1);
  };
  const nextQuestion = () => {
    if (nr + 1 === total) {
      Stop();
    } else {
      setNr(nr + 1);
    }
  };

  const Stop = () => {
    setDisplayPopup("flex");
  };

  return (
    <form>
      <div className="container">
        {displayPopup === "flex" ? (
          <Popup
            style={{ display: displayPopup }}
            total={total}
            history={props.history}
          />
        ) : null}
        <div className="row">
          <div className="col-lg-10 col-lg-offset-1">
            <TimerQuiz min={0.1} Stop={Stop} />

            <button type="button" className="fancy-btn" onClick={Stop}>
              Stop
            </button>
            <div id="question">
              <h4>
                Question {nr + 1}/{total}
              </h4>
              <p>{question}</p>
            </div>
            <Answers
              answers={answers}
              correct={correct}
              isAnswered={questionAnswered}
              setIsAnswered={setQuestionAnswered}
              questionId={data.exam[0].questions[nr].id}
              form={form}
              setForm={setForm}
            />
            <div id="submit">
              <button
                type="button"
                className="fancy-btn"
                onClick={nextQuestion}
              >
                {nr + 1 === total ? "Finish quiz" : "Next question"}
              </button>
              <button
                disabled={nr === 0}
                type="button"
                className="fancy-btn"
                onClick={prevQuestion}
              >
                {nr === 0 ? "no prev question" : "Prev question"}
              </button>
              <button type="button" className="fancy-btn" onClick={skip}>
                {questionAnswered ? " remove ans" : "skip"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Exam;
