import React from 'react';
import { Grid, Text, Image, Button } from '../elements';
import postEx from '../img/main.jpg';

import {faCarrot} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

import {history} from '../redux/configStore';

import {useDispatch} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';

const Post = (props) => {

  return (
    <React.Fragment>
      <Grid height="30%" margin="0px 0px 5px 0px">
        <Grid is_flex bg={"#D6D6D6"} top="true" border_top="#595959" padding="4px 6px;">
          <Grid is_flex>
            <Text bold width="40%">{props.user_info.user_name}</Text>
            <Text size="12px;">({props.insert_d})</Text>
          </Grid>
        </Grid>
        <Grid rows="true" height="144px" width="auto" border="1px solid #595959;" padding="2%">
          <Image src={props.image_url}/>
          <Grid overflow height="100px">
            <Text margin="0px 0px 0% 10%">{props.contents}</Text>
          </Grid>
          <Icon>
            <br/><br/><br/>
            <Text>{props.comment_cnt}</Text>
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
  insert_d: "Jul 08, 2021",
  img_url: postEx,
  contents: "ㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇ",
  comment_cnt :"0"
}

const Icon = styled.div`
`;


export default Post;