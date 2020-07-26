import ResultReducer from './Reducer_Result';
import { SEND_RESULT } from '../actions/types';

describe('Result Reducer', () => {
  const data = 'Fake_Data';
  it('should handle action with unknown type', () => {
    expect(ResultReducer(undefined, {})).toBeNull();
  });

  it('should handle action of type SEND_RESULT', () => {
    const action = { type: SEND_RESULT, payload: data };
    expect(ResultReducer(undefined, action)).toBe(data);
  });
});
