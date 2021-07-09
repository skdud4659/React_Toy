import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Permit from '../shared/Permit';
import PostDetail from '../components/PostDetail'
import {actionCreators as postActions} from '../redux/modules/post'

import {Grid} from '../elements'


import styled from 'styled-components';

import Comments from '../components/Comments'
import CommentWrite from '../components/CommentWrite';

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

  

  return (
    <React.Fragment>
        {post && (
        <PostDetail {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
        <Permit>
          <CommentWrite post_id={id} />
        </Permit>
        <Grid overflow height="35%">
          <Comments post_id={id}/>
        </Grid>
    </React.Fragment>
  );
}

const Icon = styled.div`
`;


export default Detail;