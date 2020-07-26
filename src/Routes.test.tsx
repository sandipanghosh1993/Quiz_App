import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import axios from 'axios';
import reducers from './reducers';
import Routes from './Routes';

describe('Routes', () => {
  const mockResponse = {
    data: {
      results: [
        {
          question: 'Who played the Waitress in the Spam?',
          correct_answer: 'Terry Jones',
          incorrect_answers: ['Eric Idle', 'Graham Chapman', 'John Cleese']
        }
      ]
    }
  };
  beforeAll(() => {
    spyOn(axios, 'get').and.callFake(() => {
      return mockResponse;
    });
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    render(
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Routes />
      </Provider>
    );
  });

  it('should perform full page navigation', async () => {
    // Home page
    expect(screen.getByText('Start')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start'));
    // Question page
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    expect(
      screen.getByText(mockResponse.data.results[0].question)
    ).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('radio')[0]);
    expect(screen.getByText('Next')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    // Result page
    expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retake Quiz'));
    // Home page
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
