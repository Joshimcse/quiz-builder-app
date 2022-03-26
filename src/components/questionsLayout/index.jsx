import MultiQuestionPerPage from './MultiQuestionPerPage';
import SingleQuestionPerPage from './SingleQuestionPerPage';

const QuestionsLayout = ({
  isShowQuestionPerPage,
  quiz,
  submittedAnswersHandler,
  setIsSubmitQuiz,
}) => {
  if (isShowQuestionPerPage) {
    return (
      <SingleQuestionPerPage
        quiz={quiz}
        submittedAnswersHandler={submittedAnswersHandler}
        setIsSubmitQuiz={setIsSubmitQuiz}
      />
    );
  } else
    return (
      <MultiQuestionPerPage
        quiz={quiz}
        submittedAnswersHandler={submittedAnswersHandler}
        setIsSubmitQuiz={setIsSubmitQuiz}
      />
    );
};

export default QuestionsLayout;
