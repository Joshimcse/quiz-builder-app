import { getQuizzes } from './quiz-crud';

export const isURL = string => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
};

export const isImage = title => {
  if (typeof title !== 'string' && !isURL(title)) return false;
  return !!title.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
};

export const isString = v => {
  return typeof v === 'string';
};

export const isObject = v => {
  return !!v && typeof v === 'object' && !isArray(v);
};

export const isArray = v => {
  return Array.isArray(v);
};

export const isEmpty = v => {
  return !(!!v
    ? typeof v === 'object'
      ? Array.isArray(v)
        ? !!v.length
        : !!Object.keys(v).length
      : true
    : false);
};

export const isValidQuestion = question => {
  return (
    !!question &&
    isObject(question) &&
    !isEmpty(question?.title) &&
    isArray(question?.options) &&
    isArray(question?.correctAnswers) &&
    question?.options?.length >= 2 &&
    question?.correctAnswers?.length >= 1 &&
    question?.options?.every(option => !isEmpty(option)) &&
    question?.options?.length >= question?.correctAnswers?.length
  );
};

export const isValidQuiz = quiz => {
  return (
    !!quiz &&
    isObject(quiz) &&
    !isEmpty(quiz?.title) &&
    isArray(quiz?.questions) &&
    !isEmpty(quiz?.questions) &&
    quiz.questions.every(isValidQuestion)
  );
};

export const isQuizAllreadyExists = (value, field) => {
  return !getQuizzes().every(
    quiz => String(quiz[field || 'id']).toLowerCase() !== value.toLowerCase()
  );
};

export const isCorrectAnswer = (correctAnwer, submitedAnswer) => {
  if (isEmpty(correctAnwer) || correctAnwer.length !== submitedAnswer.length)
    return false;

  if (correctAnwer.length === 1) return correctAnwer[0] === submitedAnswer[0];
  else {
    let sortedCorrectAnswer = correctAnwer.sort();
    let sortedSubmitedAnswer = submitedAnswer.sort();

    return sortedSubmitedAnswer.every(
      (answer, index) => answer === sortedCorrectAnswer[index]
    );
  }
};

export const isVisitForFirstTime = () => {
  if (localStorage.getItem('allready_visited') !== 'true') {
    localStorage.setItem('allready_visited', 'true');
    return true;
  }
  return false;
};
