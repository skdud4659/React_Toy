import React from 'react';
import './App.css';
import style from 'styled-components';

import Start from './Start';
import Quiz from './Quiz';
import Result from './Result';
import Comment from './Comment';
import Rank from './Rank'
import Progress from './Progress'

import {Route, Switch} from "react-router-dom";
import { withRouter } from "react-router";


const App = () => {
  return (
    <Wrap className="App">
      <Progress/>
      <Switch>
        <Route path="/" exact component={Start}/>
        <Route path="/quiz" component={Quiz}/>
        <Route path="/result" component={Result}/>
        <Route path="/comment" component={Comment}/>
        <Route path="/rank" component={Rank}/>
      </Switch>
    </Wrap>
  );
}

const Wrap = style.div`
  width: 100vw;
  height: 100vh;
`;

export default (withRouter(App));
