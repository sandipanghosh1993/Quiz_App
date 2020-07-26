import { FETCH_QUESTIONS, RESET_QUESTIONS, SEND_RESULT } from './types';
import { fetchQuestions, resetQuestions, sendScore } from './index';
import axios from 'axios';

describe('Actions', () => {
  describe('fetchQuestions', () => {
    let action: any;
    const responseData = 'Response_Data';
    beforeAll(() => {
      spyOn(axios, 'get').and.callFake(() => {
        return responseData;
      });
      action = fetchQuestions(10, 15, 'hard');
    });

    it('should return the correct type', done => {
      action.then((e: any) => {
        expect(e.type).toBe(FETCH_QUESTIONS);
        done();
      });
    });

    it('should return the correct payload', done => {
      action.then((e: any) => {
        expect(e.payload).toBe(responseData);
        done();
      });
    });
  });

  describe('resetQuestions', () => {
    const action = resetQuestions();
    it('should return the correct type', () => {
      expect(action.type).toBe(RESET_QUESTIONS);
    });

    it('should return the correct payload', () => {
      expect(action.payload).toBeNull();
    });
  });

  describe('sendScore', () => {
    const action = sendScore(14.155, 10, 6);
    it('should return the correct type', () => {
      expect(action.type).toBe(SEND_RESULT);
    });

    it('should return the correct payload', () => {
      expect(action.payload).toStrictEqual({
        questions: 10,
        score: 6,
        time: '14 sec'
      });
    });
  });
});
