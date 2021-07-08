import React from 'react';
import { Grid, Text, Image, Input, Button } from '../elements';

import {useDispatch, useSelector} from 'react-redux';
import Permit from '../shared/Permit';
import PostDetail from '../components/PostDetail'
import {actionCreators as postActions} from '../redux/modules/post'
import {actionCreators as commentActions} from '../redux/modules/comment'

import styled from 'styled-components';

import Comments from '../components/Comments'

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  const user_info = useSelector((state)=>state.user.user);
  const post_list = useSelector((state)=>state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if(post) {
      return;
    }
    console.log(id)
    dispatch(postActions.getOnePostFB(id));
  },[])

  const [comment, setComment] = React.useState();


  const input_comment = (e) => {
    setComment(e.target.value);
  }

  const addCommentBtn = () => {
    if(comment === "") {
      window.alert('댓글을 입력해주세요!');
      return;
    }
    dispatch(commentActions.addCommentFB(id, comment));
    setComment("");
  }

  return (
    <React.Fragment>
        {post && (
        <PostDetail {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
        <Permit>
          <Grid height="10%" margin="5% 0px 0px 0px">
            <Grid bg={"#D6D6D6"} top="true" border_top="#595959" padding="4px 6px;">
            <Button
              width="40px;"
              bg={"none"}
              border="1px solid #595959"
              _onClick={addCommentBtn}
              >작성</Button>
            </Grid>
              <Grid height="8%">
                <Input
                  width="95.4%"
                  padding="5px"
                  placeholder="댓글을 입력해주세요."
                  _onChange={input_comment}/>
              </Grid>
          </Grid>
        </Permit>
        <Comments post_id={id}/>
    </React.Fragment>
  );
}

const Icon = styled.div`
`;


export default Detail;