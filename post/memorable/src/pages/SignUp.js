import React from 'react';
import HomeImg from '../img/IMG_2246 2.jpg'

import {Grid, Text, Button, Input, Image} from '../elements';

import {useDispatch, useSelector} from 'react-redux';
import {actionCreators as userActions} from '../redux/modules/user'

const SignUp = (props) => {
  const dispatch = useDispatch();

  //input value
  const [id, setId] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pw_chk, setPwChk] = React.useState("");

  //input func
  const input_id = (e) => {
    setId(e.target.value)
  };

  const input_user_name = (e) => {
    setUserName(e.target.value)
  };

  const input_pw = (e) => {
    setPw(e.target.value)
  };  

  const input_pw_chk = (e) => {
    setPwChk(e.target.value)
  };

  const signupBtn = () => {
    if (id === "" || user_name === "" || pw === "") {
      window.alert('모든 항목을 입력해주세요.')
      return;
    };

    if (pw !== pw_chk) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다. 한 번 더 확인해주세요.')
      return;
    }; 
    window.alert('회원가입 성공!')
    dispatch(userActions.signUpFB(id, pw, user_name));
  }


  return (
    <React.Fragment>
      <Grid height="100%" overflow>
        <Grid border="2px solid #60C1DF" is_over>
          <Text is_over="true" bold size="2em">회 원 가 입 하 기</Text>
          <Image src={HomeImg} shape="preview"/>
        </Grid>
        <Grid height="55%" overflow>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              padding="3% 0px"
              label="아이디"
              placeholder="이메일 형식의 아이디를 입력해주세요"
              _onChange={input_id}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              padding="3% 0px"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              _onChange={input_user_name}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              type="password"
              padding="3% 0px"
              label="비밀번호"
              placeholder="6자 이상으로 비밀번호를 입력해주세요."
              _onChange={input_pw}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              type="password"
              padding="3% 0px"
              label="비밀번호 확인"
              placeholder="비밀번호를 확인해주세요."
              _onChange={input_pw_chk}
              />
          </Grid>
          <Button
            width="84px"
            height="36px"
            margin="5% auto"
            _onClick={signupBtn}
            >
            <Text color={"white"} bold>가입하기</Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignUp;