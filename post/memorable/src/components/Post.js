import React from 'react';
import { Grid, Text, Image } from '../elements';
import postEx from '../img/main.jpg'

import {faCarrot} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid height="30%">
        <Grid is_flex bg={"#D6D6D6"} top="true" border_top="#595959" padding="4px 6px;">
          <Text bold>{props.user_info.user_name}</Text>
          <Text>({props.insert_dt})</Text>
        </Grid>
        <Grid rows="true" height="144px" width="auto" border="1px solid #595959;" padding="2%">
          <Image />
          <Grid>
            <Text margin="0px 0px 0% 10%">{props.contents}</Text>
          </Grid>
          <Icon>
            <br/><br/><br/><br/>
            <FontAwesomeIcon icon={faCarrot} size="2x" color={"#EE6705"}/>
          </Icon>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Post.defaultProps = {
  user_info: {
    user_name: 'fall_of'
  },
  insert_dt: "2021.07.06 14:00",
  img_url: postEx,
  contents: "ㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇ",
}

const Icon = styled.div`
`;


export default Post;