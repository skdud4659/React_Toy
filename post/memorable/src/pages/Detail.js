import React from 'react';
import { Grid, Text, Image, Input } from '../elements';
import postEx from '../img/main.jpg'

import styled from 'styled-components';

import Comments from '../components/Comments'

const Detail = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid height="28%">
          <Grid is_flex bg={"#FFE3C1"} top="true" border_top="#D58A32"padding="4px 6px;">
            <Text bold>{props.user_info.user_name}</Text>
            <Text>({props.insert_dt})</Text>
          </Grid>
          <Grid overflow height="200%" width="auto" border="1px solid #D58A32;" padding="2%">
            <Image width="100%" height="85%"/>
            <Grid height="8%" margin="2% 0px 2% 0px">
              <Text>{props.contents}</Text>
            </Grid>
          </Grid>
        </Grid>
        <Grid height="10%" margin="5% 0px 0px 0px">
          <Grid bg={"#D6D6D6"} top="true" border_top="#595959" padding="4px 6px;">
            <Text>작성 btn</Text>
          </Grid>
            <Grid height="8%">
              <Input width="95.4%" padding="5px" placeholder="댓글을 입력해주세요."/>
            </Grid>
        </Grid>
        <Comments />
      </Grid>
    </React.Fragment>
  );
}

Detail.defaultProps = {
  user_info: {
    user_name: 'fall_of',
    user_id: "",
  },
  insert_dt: "2021.07.06 14:00",
  img_url: postEx,
  contents: "ㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇ",
}

const Icon = styled.div`
`;


export default Detail;