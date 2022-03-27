import { v4 as uuidv4 } from 'uuid';
import { isArray, isEmpty, isQuizAllreadyExists, isValidQuiz } from './is';

export const setQuizzesInLocalStorage = quizzes => {
  localStorage.setItem('quizzes', JSON.stringify(quizzes));
};

export const getQuizzes = () => {
  let quizzes = JSON.parse(localStorage.getItem('quizzes'));
  return isArray(quizzes) ? quizzes : [];
};

export const getQuiz = _id => {
  return getQuizzes().find(({ id }) => id === _id) || undefined;
};

export const addNewQuiz = (quiz = null) => {
  // if (!!quiz && isValidQuiz(quiz)) {
  if (!!quiz) {
    const quizzes = getQuizzes();
    if (!isQuizAllreadyExists(quiz.title, 'title')) {
      setQuizzesInLocalStorage([...quizzes, { ...quiz, id: uuidv4() }]);
      return true;
    }
  }
  return false;
};

export const editQuiz = (quiz = null) => {
  const quizzes = getQuizzes();

  const index = quizzes.findIndex(({ id }) => id === quiz.id);
  if (index !== -1) {
    quizzes[index] = quiz;
    setQuizzesInLocalStorage(quizzes);
    return true;
  }
  return false;
};

export const deleteQuiz = _id => {
  const quizzes = getQuizzes();
  if (!isEmpty(quizzes)) {
    let quizzesAfterDelete = quizzes.filter(({ id }) => id !== _id);
    setQuizzesInLocalStorage(quizzesAfterDelete);
    return quizzesAfterDelete;
  } else return null;
};