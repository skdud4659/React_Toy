import React from 'react'
import './App.css';
import style from 'styled-components'

import Board from './optJS/Board';
import Write from './optJS/Write';
import Edit from './optJS/Edit';

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
