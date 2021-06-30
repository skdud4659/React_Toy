import React from 'react'
import './App.css';
import style from 'styled-components'

import Board from './Board';
import Write from './Write';
import Edit from './Edit';

import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Board}/>
        <Route path='/write' exact component={Write}/>
        <Route path='/edit/:index' exact component={Edit}/>
      </Switch>
    </div>
  );
}

export default App;
