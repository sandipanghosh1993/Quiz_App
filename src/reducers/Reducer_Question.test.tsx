import QuestionsReducer from './Reducer_Question';
import { FETCH_QUESTIONS, RESET_QUESTIONS } from '../actions/types';

describe('Question Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(QuestionsReducer(undefined, {})).toBeNull();
  });

  it('should handle action of type FETCH_QUESTIONS', () => {
    const action = { type: FETCH_QUESTIONS, payload: data };
    expect(QuestionsReducer(undefined, action)).toBe(data);
  });

  it('should handle action of type RESET_QUESTIONS', () => {
    const action = { type: RESET_QUESTIONS, payload: data };
    expect(QuestionsReducer(undefined, action)).toBe(data);
  });
});
