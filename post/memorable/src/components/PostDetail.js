import React from 'react';
import { Grid, Text, Image, Input, Button } from '../elements';
import postEx from '../img/main.jpg'

import {history} from '../redux/configStore';

import {useDispatch} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const editBtn = () => {
    history.push(`/writedit/${props.id}`)
  }

  const deleteBtn = () => {
      let result = window.confirm('정말 삭제하시겠어요?')
      result ? dispatch(postActions.deletePostFB(`${props.id}`)) : history.push('/')

  }

  return (
    <React.Fragment>
      <Grid>
        <Grid>
          <Grid is_flex bg={"#FFE3C1"} top="true" border_top="#D58A32"padding="4px 6px;">
            <Grid is_flex>
              <Text bold width="40%">{props.user_info.user_name}</Text>
              <Text size="12px;">({props.insert_dt})</Text>
            </Grid>
            <Grid is_flex width="auto">
              {props.is_me && (<Button width="40px;"
                margin="0px 10px 0px 0px"
                bg={"none"}
                border="1px solid #595959"
                _onClick={editBtn}>수정</Button>)}
                
              {props.is_me && (<Button width="40px;"
                bg={"none"}
                border="1px solid #595959"
                _onClick={deleteBtn}>삭제</Button>)}
            </Grid>
          </Grid>
          <Grid width="auto" border="1px solid #D58A32;" padding="2%">
            <Image src={props.image_url} shape="detail"/>
            <Grid height="10%" margin="2% 0px 2% 0px">
              <Text>{props.contents}</Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PostDetail.defaultProps = {
  user_info: {
    user_name: 'fall_of',
    user_id: "",
  },
  insert_dt: "2021.07.06 14:00",
  img_url: postEx,
  contents: "ㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇㄱㅇㅇ",
}

export default PostDetail;