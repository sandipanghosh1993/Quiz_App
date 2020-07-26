import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Question from './Question';
import reducers from '../reducers';

describe('Question', () => {
  describe('Without response data', () => {
    it('should render correct header text', () => {
      render(
        <Provider store={createStore(reducers)}>
          <Question />
        </Provider>
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('With response data', () => {
    const mockResponse = {
      data: {
        results: [
          {
            question: 'Who played the Waitress in the Spam?',
            correct_answer: 'Terry Jones',
            incorrect_answers: ['Eric Idle', 'Graham Chapman', 'John Cleese']
          },
          {
            question: 'What is the most common pub name in the UK?',
            correct_answer: 'Red Lion',
            incorrect_answers: ['White Hart', 'Royal Oak', 'Kings Head']
          }
        ]
      }
    };
    beforeEach(() => {
      render(
        <Provider
          store={createStore(
            combineReducers({
              questions: () => {
                return mockResponse;
              }
            })
          )}
        >
          <Question />
        </Provider>
      );
    });

    it('should render first question text', () => {
      expect(
        screen.getByText(mockResponse.data.results[0].question)
      ).toBeInTheDocument();
    });

    it('should render answer options', () => {
      expect(screen.getAllByRole('radio').length).toBe(4);
    });

    it('should render disabled next button when answers is not chosen', () => {
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Next')).toHaveAttribute('disabled');
    });

    it('should render enabled next button when answers is not chosen', () => {
      fireEvent.click(screen.getAllByRole('radio')[0]);
      expect(screen.getByText('Next')).not.toHaveAttribute('disabled');
    });

    it('should render next question when next button is clicked', () => {
      fireEvent.click(screen.getAllByRole('radio')[0]);
      fireEvent.click(screen.getByText('Next'));
      expect(
        screen.getByText(mockResponse.data.results[1].question)
      ).toBeInTheDocument();
    });

    it('should render restart button', () => {
      expect(screen.getByText('Restart')).toBeInTheDocument();
    });
  });
});
