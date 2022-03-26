import { useEffect, useState } from 'react';
import { getQuiz } from '../utils/quiz-crud';
import { useParams } from 'react-router-dom';

import Success from '../components/view/Success';
import QuestionsLayout from '../components/questionsLayout';

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  const [submitedAnswers, setSubmitedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowPageNotFound, setIsShowPageNotFound] = useState(false);

  useEffect(() => {
    // const _quiz = getQuiz("588a37a6-cc84-4e0b-b3e1-0d321fdc015b");
    const _quiz = getQuiz(quizId);

    if (_quiz) {
      setQuiz(_quiz);

      // intialize submittedAnswers with []
      setSubmitedAnswers(_quiz?.questions?.map(() => []));

      // create correct answers set.
      setCorrectAnswers(
        _quiz?.questions?.map(question => question.correctAnswers)
      );
    } else {
      setIsShowPageNotFound(true);
    }
  }, [quizId]);

  const submittedAnswersHandler = (index, value) => {
    const _submitedAnswers = submitedAnswers;

    if (_submitedAnswers[index]?.includes(value)) {
      const i = _submitedAnswers[index].indexOf(value);
      if (i > -1) {
        _submitedAnswers[index].splice(i, 1);
        setSubmitedAnswers([..._submitedAnswers]);
      }
    } else {
      _submitedAnswers[index].push(value);
      setSubmitedAnswers([..._submitedAnswers]);
    }
  };

  const handleTryAgain = () => {
    // intialize submittedAnswers with []
    setSubmitedAnswers(quiz?.questions?.map(() => []));
    setIsSubmitQuiz(false);
  };

  return quiz ? (
    isSubmitQuiz ? (
      <Success
        correctAnswers={correctAnswers}
        submitedAnswers={submitedAnswers}
        pointPerQuetion={quiz?.pointPerQuetion}
        handleTryAgain={handleTryAgain}
      />
    ) : (
      <QuestionsLayout
        isShowQuestionPerPage={quiz?.isShowQuestionPerPage}
        quiz={quiz}
        submittedAnswersHandler={submittedAnswersHandler}
        setIsSubmitQuiz={setIsSubmitQuiz}
      />
    )
  ) : null;
};

export default ViewQuiz;
