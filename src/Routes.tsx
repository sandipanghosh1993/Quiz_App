import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Question from './components/Question';
import Result from './components/Result';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/result" component={Result} />
          <Route path="/question" component={Question} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
