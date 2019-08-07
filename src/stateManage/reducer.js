export const initialState = {
  chosenAns: {},
  questions: [],
  score: 0
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "changeChosenAns":
      return {
        ...state,
        chosenAns: action.chosenAns
      };
    case "questions":
      return {
        ...state,
        questions: action.questions
      };
    case "score":
      return {
        ...state,
        score: action.score
      };
    default:
      return state;
  }
};
