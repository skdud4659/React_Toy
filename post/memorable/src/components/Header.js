import React from 'react';
import { Grid, Text, Button } from '../elements';

import {history} from '../redux/configStore'

import {apiKey} from '../shared/firebase';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user';
import styled from 'styled-components';

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state)=> state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if(is_login && is_session) {
    return (
      <Grid>
      <Grid is_flex padding="3% 3%;">
        <Grid>
        <A href="/"><Text color={"#EE6705"} bold size="20px">Memorable</Text></A>
        </Grid>
        <Grid is_flex width="auto">
          <Button
            width="66px"
            height="28px"
            margin="0px 3% 0px 0px"
            _onClick={() => {
              history.push('/writedit')
            }}>
            <Text bold color="white">글쓰기</Text>
          </Button>
          <Button
            width="66px"
            height="28px"
            _onClick={() => {
              dispatch(userActions.logoutFB({}));
            }}>
            <Text bold color="white">로그아웃</Text>
          </Button>
        </Grid>
      </Grid>
    </Grid>
    )
  }

  return (
      <Grid>
        <Grid is_flex padding="3% 3%;">
          <Grid>
          <Text color={"#EE6705"} bold size="20px">Memorable</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Button
              width="66px"
              height="28px"
              margin="0px 3% 0px 0px"
              _onClick={() => {
                history.push('/signup')
              }}>
              <Text bold color="white">회원가입</Text>
            </Button>
            <Button
              width="66px"
              height="28px"
              _onClick={() => {
                history.push('/login')
              }}>
              <Text bold color="white">로그인</Text>
            </Button>
          </Grid>
        </Grid>
      </Grid>
  )
}

const A = styled.a`
  text-decoration: none;
`;


export default Header;