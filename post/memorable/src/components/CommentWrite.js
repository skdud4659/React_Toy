import React from 'react';
import { Grid, Text, Image, Input, Button } from '../elements';

import {useDispatch, useSelector} from 'react-redux';

import {actionCreators as commentActions} from '../redux/modules/comment'

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState();

  const {post_id} =props


  const input_comment = (e) => {
    setComment(e.target.value);
  }

  const addCommentBtn = () => {
    if(comment === "") {
      window.alert('댓글을 입력해주세요!');
      return;
    }
    dispatch(commentActions.addCommentFB(post_id, comment));
    setComment("");
  }

  return (
    <React.Fragment>
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
                  _onChange={input_comment}
                  onSubmit={addCommentBtn}
                  value={comment}/>
              </Grid>
          </Grid>
    </React.Fragment>
  );
}

export default CommentWrite;