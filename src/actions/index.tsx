import { FETCH_QUESTIONS, RESET_QUESTIONS, SEND_RESULT } from './types';
import axios from 'axios';

const ROOT_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions(
  amount: number,
  category: number,
  difficulty: string
) {
  try {
    const response = await axios.get(ROOT_URL, {
      params: {
        amount,
        category,
        difficulty,
        type: 'multiple'
      }
    });
    return {
      type: FETCH_QUESTIONS,
      payload: response
    };
  } catch (error) {
    console.error(error);
  }
}

export function resetQuestions() {
  return {
    type: RESET_QUESTIONS,
    payload: null
  };
}

export function sendScore(time: number, questions: number, score: number) {
  const min = Math.floor(time / 60);
  const minText = min > 0 ? min + ' min ' : '';
  const duration = minText + Math.floor(time % 60) + ' sec';
  return {
    type: SEND_RESULT,
    payload: {
      time: duration,
      questions,
      score
    }
  };
}
