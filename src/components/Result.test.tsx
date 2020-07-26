import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import Result from './Result';

describe('Result', () => {
  beforeEach(() => {
    const mockResult = { time: '1 min 17 sec', questions: 10, score: 6 };
    render(
      <Provider
        store={createStore(
          combineReducers({
            result: () => {
              return mockResult;
            }
          })
        )}
      >
        <Result />
      </Provider>
    );
  });

  it('should render time taken label and value', () => {
    expect(screen.getByText('Time taken:')).toBeInTheDocument();
    expect(screen.getByText('1 min 17 sec')).toBeInTheDocument();
  });

  it('should render correct answer label and value', () => {
    expect(screen.getByText('Correct:')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('should render incorrect answer label and value', () => {
    expect(screen.getByText('Incorrect:')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should render score label and value', () => {
    expect(screen.getByText('Score in %:')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });

  it('should render retake quiz button', () => {
    expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
  });

  it('should render previous quiz results dropdown', () => {
    expect(
      screen.getByText('--- See previous quiz results ---')
    ).toBeInTheDocument();
  });
});
