import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Home';
import reducers from '../reducers';

describe('Home', () => {
  beforeEach(() => {
    render(
      <Provider store={createStore(reducers)}>
        <Home />
      </Provider>
    );
  });

  it('should render correct header text', () => {
    expect(screen.getByText('Fun Quiz')).toBeInTheDocument();
  });

  it('should render correct Questions dropdown', () => {
    expect(screen.getByText('Questions')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should render correct Category dropdown', async () => {
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('General Knowledge')).toBeInTheDocument();
  });

  it('should render correct Difficulty dropdown', () => {
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('should render correct Start button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
