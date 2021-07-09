import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {history} from '../redux/configStore';

import Post from '../components/Post';
import { Button, Grid, Text } from '../elements';
import InfinityScroll from '../components/InfinityScroll';
import styled from 'styled-components'


const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state)=> state.post.is_loading);
  const paging = useSelector((state)=> state.post.paging);

  React.useEffect(() => {
    console.log(is_loading, paging)
    if(post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  },[]);

  return (
    <React.Fragment>
      <Grid box overflow>
      <InfinityScroll
            callNext={() => {
              console.log("next!")
              // dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          >
        {post_list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Grid
              _onClick={(e) => {
                history.push(`/detail/${p.id}`);
                e.preventDefault();
                e.stopPropagation();
              }}
              key={p.id}>
                <Post key={p.id} {...p} is_me/>
              </Grid>
            )
          } else {
            return (
              <Grid
              _onClick={(e) => {
                history.push(`/detail/${p.id}`);
                e.preventDefault();
                e.stopPropagation();
              }}
              key={p.id}>
                <Post {...p}/>
              </Grid>
            )
          }
        })}
        <MoreBtn onClick={() => dispatch(postActions.getPostFB(paging.next))}>더 보기</MoreBtn>

        </InfinityScroll>
        </Grid>
    </React.Fragment>
  );
}

const MoreBtn = styled.button`
  margin: 10% auto;
  background-color: #D6D6D6;
  display: block;
`;

export default Main;