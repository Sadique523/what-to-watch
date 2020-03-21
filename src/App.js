import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from './components/landing';
import Header from './components/header';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route component={Landing} exact path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
