import { combineReducers } from 'redux';
import QuestionReducer from './Reducer_Question';
import ResultReducer from './Reducer_Result';

const rootReducer = combineReducers({
  questions: QuestionReducer,
  result: ResultReducer
});

export default rootReducer;
