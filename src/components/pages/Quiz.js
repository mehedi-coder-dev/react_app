import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useQuestion from "../../hooks/useQuestion";
import Answers from "../Answers";
import Miniplayer from "../Miniplayer";
import Progressbar from "../Progressbar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((options) => {
          options.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked = action.value;

      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();

  const { loading, error, question } = useQuestion(id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentUser } = useAuth();
  const history = useHistory();
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { state } = useLocation();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: question,
    });
  }, [question]);

  const handleAnswerChange = (e, index) => {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  // handle when user clicks the next button to get the next question

  function nextQuestion() {
    if (currentQuestion <= question.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }
  // handle when user clicks the previous button to get the previous question

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= question.length) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  // submit quiz
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }

  // calculate parcentage of progress
  const parcentage = question.length > 0 ? ((currentQuestion + 1) / question.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers input={true} options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
          <Progressbar next={nextQuestion} prev={prevQuestion} parcent={parcentage} submit={submit} />
          <Miniplayer id={id} title={state.videoTitle} />
        </>
      )}
    </>
  );
}
