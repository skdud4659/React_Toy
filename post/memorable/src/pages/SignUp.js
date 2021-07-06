import React from 'react';
import HomeImg from '../img/IMG_2246 2.jpg'

import {Grid, Text, Button, Input, Image} from '../elements'

const SignUp = (props) => {

  const id = React.useRef(null);
  const nick_name = React.useRef(null);
  const pw = React.useRef(null);
  const chk_pw = React.useRef(null);

  return (
    <React.Fragment>
      <Grid height="100%" overflow>
        <Grid border="2px solid #60C1DF" is_over>
          <Text is_over="true" bold size="2em">회 원 가 입 하 기</Text>
          <Image src={HomeImg} width="100%" height="100%"/>
        </Grid>
        <Grid height="55%" overflow>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              padding="3% 0px"
              label="아이디"
              placeholder="이메일 형식의 아이디를 입력해주세요"
              ref={id}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              padding="3% 0px"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              ref={nick_name}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              type="password"
              padding="3% 0px"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              ref={pw}
              />
          </Grid>
          <Grid margin="5% auto 0px auto" width="85%">
            <Input
              type="password"
              padding="3% 0px"
              label="비밀번호 확인"
              placeholder="비밀번호를 확인해주세요."
              ref={chk_pw}
              />
          </Grid>
          <Button width="84px" height="36px" margin="5% auto">
            <Text color={"white"} bold>가입하기</Text>
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignUp;