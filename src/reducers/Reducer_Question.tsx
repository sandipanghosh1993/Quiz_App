import { FETCH_QUESTIONS, RESET_QUESTIONS } from '../actions/types';

export default function(state = null, action: any) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return action.payload;
    case RESET_QUESTIONS:
      return action.payload;
  }
  return state;
}
