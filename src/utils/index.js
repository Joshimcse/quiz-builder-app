import { isCorrectAnswer } from './is.js';

export {
  isURL,
  isImage,
  isString,
  isObject,
  isArray,
  isEmpty,
  isValidQuestion,
  isValidQuiz,
  isQuizAllreadyExists,
  isCorrectAnswer,
  isVisitForFirstTime
} from './is.js';

export {
  setQuizzesInLocalStorage,
  getQuizzes,
  getQuiz,
  addNewQuiz,
  editQuiz,
  deleteQuiz,
} from './quiz-crud';

export const getQuestionType = question => {
  if (question?.options.length >= 1) {
    return 'checkbox';
  }
  return 'radio';
};

export const formatQuestionForStore = question => {
  const options = [];
  const correctAnswers = [];

  question?.optionsWithAnswer?.forEach(option => {
    options.push(option.value);
    if (option?.isCorrect) {
      correctAnswers.push(option.value);
    }
  });

  return {
    id: question.id,
    title: question.title,
    options,
    correctAnswers,
  };
};

export const formatQuestionForState = question => {
  const optionsWithAnswer = [];

  question?.options?.forEach(option => {
    const optionWithAnswer = {};
    optionWithAnswer.value = option;
    optionWithAnswer.isCorrect = question?.correctAnswers.includes(option)
      ? true
      : false;
    optionsWithAnswer.push(optionWithAnswer);
  });

  return {
    id: question.id,
    title: question.title,
    optionsWithAnswer,
  };
};

export const formatQuestionsForStore = questions => {
  return questions.map(question => formatQuestionForStore(question));
};

export const formatQuestionsForState = questions => {
  return questions.map(question => formatQuestionForState(question));
};

export const getQuizResult = (
  correctAnswers,
  submitedAnswers,
  pointPerQuestions
) => {
  let numberOfCorrectAnswers = 0;

  correctAnswers?.forEach((correctAnswer, index) => {
    if (isCorrectAnswer(correctAnswer, submitedAnswers[index]))
      numberOfCorrectAnswers++;
  });

  return [numberOfCorrectAnswers, numberOfCorrectAnswers * pointPerQuestions];
};
