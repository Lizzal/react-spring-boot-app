import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Home from './Home';
import GroupList from './GroupList';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/groups" exact={true} component={GroupList} />
        </Switch>
      </Router>
    );
  }
}
