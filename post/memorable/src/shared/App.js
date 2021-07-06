import React from 'react';

//라우팅
import {Route, BrowserRouter} from 'react-router-dom'
import Main from '../pages/Main'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import WriteEdit from '../pages/WriteEdit'
import Detail from '../pages/Detail'

import Header from '../components/Header';
import Layout from '../components/Layout';
import LayInner from '../components/LayInner';

function App () {
  return (
      <Layout>
        <Header></Header>
        <LayInner>
          <BrowserRouter>
              <Route path='/' exact component={Main}/>
              <Route path='/login' exact component={LogIn}/>
              <Route path='/signup' exact component={SignUp}/>
              <Route path='/writedit' exact component={WriteEdit}/>
              <Route path='/detail' exact component={Detail}/>
          </BrowserRouter>
        </LayInner>
      </Layout>
  );
}

export default App;
