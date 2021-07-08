import React from 'react';
import { Grid, Text, Image } from '../elements';
import postEx from '../img/main.jpg'
import {history} from '../redux/configStore';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as commentActions} from '../redux/modules/comment';

import styled from 'styled-components';

const Comments = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list);

  const {post_id} = props;

  React.useEffect(() => {
    // 코멘트 정보가 없으면 불러오기
    if(!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  },[])

  // comment가 없거나, post_id가 없으면 아무것도 안넘겨준다!
  if(!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid>
        {comment_list[post_id].map(c => {
          return (
            <CommentItem key={c.id} {...c}/>
          )
        })}
      </Grid>
    </React.Fragment>
  );
}

Comment.defaultProps = {
  post_id:null,
}

Comments.defaultProps = {
  user_info: {
    user_name: 'mane_kim',
    user_profile: '',
  },
  insert_d: "Jul 08,2021",
  comment: "안녕 가을아!",
}

const Icon = styled.div`
`;


export default Comments;

const CommentItem = (props) => { 

  const {user_profile, user_name, user_id, post_id, comment, insert_d} = props;
  return (
    <Grid>
      <Grid height="10%" margin="5% 0px 0px 0px" >
      <Grid is_flex bg={"#FFE3C1"} top="true" border_top="#D58A32" padding="4px 6px;">
        <Text bold>{user_name}</Text>
        <Text>({insert_d})</Text>
      </Grid>
        <Grid height="8%" is_flex border="1px solid #D58A32">
          <Grid>
            <Image shape="profile" src={postEx}/>
          </Grid>
          <Grid>
            <Text>{comment}</Text>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}


CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  comment: "귀여운 고양이네요!",
  insert_d: 'Jun 08, 2021'
}