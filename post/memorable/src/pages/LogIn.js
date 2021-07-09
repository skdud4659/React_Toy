import React from 'react';
import HomeImg from '../img/IMG_2246 2.jpg'

import {Grid, Text, Button, Input, Image} from '../elements'

import {useDispatch, useSelector} from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'
import {emailCheck} from '../shared/MailChk';

const LogIn = (props) => {
  const dispatch = useDispatch()

  //input value
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");

  //input onchange
  const login_id = (e) => {
    setId(e.target.value)
  };

  const login_pw = (e) => {
    setPw(e.target.value)
  };

  //btn
  const loginBtn = () => {
    if(id === "" || pw === "") {
      window.alert('모든 항목을 입력해주세요!')
      return;
    }

    if(!emailCheck(id)){
      window.alert('이메일 형식을 확인해주세요!')
    }

    window.alert('로그인 성공!')
    dispatch(userActions.logInFB(id, pw))
  }

  return (
    <React.Fragment>
      <Grid height="100%" overflow>
        <Grid border="2px solid #60C1DF" is_over>
          <Text is_over="true" bold size="2em" margin="auto">로 그 인 하 기</Text>
          <Image src={HomeImg} shape="preview"/>
        </Grid>
        <Grid height="55%" overflow margin="8% 0px">
          <Grid margin="10% auto 0px auto" width="85%">
            <Input
              noValue
              padding="3% 0px"
              label="아이디"
              placeholder="이메일 형식의 아이디를 입력해주세요"
              _onChange={login_id}
              />
          </Grid>
          <Grid margin="10% auto 0px auto" width="85%">
            <Input
              noValue
              type="password"
              padding="3% 0px"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              _onChange={login_pw}
              />
          </Grid>
          <Button
            width="84px"
            height="36px"
            margin="15% auto"
            _onClick={loginBtn}>
            <Text color={"white"} bold>들어가기</Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default LogIn;