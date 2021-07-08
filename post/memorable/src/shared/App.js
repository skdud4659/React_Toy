import React from 'react';

//라우팅
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router';
import {history} from '../redux/configStore';

import Main from '../pages/Main'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import WriteEdit from '../pages/WriteEdit'
import Detail from '../pages/Detail'

import Header from '../components/Header';
import Layout from '../components/Layout';
import LayInner from '../components/LayInner';

//로그인 유지
import {useDispatch} from 'react-redux';
import {apiKey} from './firebase';
import {actionCreators as userActions} from '../redux/modules/user';

function App () {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true:false;

  React.useEffect(() => {
    if(is_session) {
      dispatch(userActions.loginchkFB());
    }
  },[])

  return (
      <Layout>
        <Header></Header>
        <LayInner>
          <ConnectedRouter history={history}>
              <Route path='/' exact component={Main}/>
              <Route path='/login' exact component={LogIn}/>
              <Route path='/signup' exact component={SignUp}/>
              <Route path='/writedit' exact component={WriteEdit}/>
              <Route path='/writedit/:id' exact component={WriteEdit}/>
              <Route path='/detail/:id' exact component={Detail}/>
          </ConnectedRouter>
        </LayInner>
      </Layout>
  );
}

export default App;
