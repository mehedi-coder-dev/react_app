import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import useAnswer from "../../hooks/useAnswer";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Quiz() {
  const { id } = useParams();
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { loading, error, answers } = useAnswer(id);

  function calculator() {
    let score = 0;

    answers.forEach((question, index1) => {
      let currectIndexs = [];
      let checkedIndexs = [];

      question.options.forEach((option, index2) => {
        if (option.correct) currectIndexs.push(index2);

        if (qna[index1].options[index2].checked) {
          checkedIndexs.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(currectIndexs, checkedIndexs)) {
        score = score + 5;
      }
    });

    return score;
  }
  const userScore = calculator();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userScore} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
