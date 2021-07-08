import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {history} from '../redux/configStore';

import Post from '../components/Post';
import { Grid } from '../elements';
import InfinityScroll from '../components/InfinityScroll';


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
      <InfinityScroll
            callNext={() => {
              console.log("next!")
              // dispatch(postActions.getPostFB(paging.next));
            }}
            is_next={paging.next ? true : false}
            loading={is_loading}
          >
          <Grid height="100%" overflow>
        {post_list.map((p, idx) => {
          if (p.user_info.user_id === user_info?.uid) {
            return (
              <Grid
              _onClick={() => {
                history.push(`/detail/${p.id}`);
              }}
              key={p.id}>
                <Post key={p.id} {...p} is_me/>
              </Grid>
            )
          } else {
            return (
              <Grid
              _onClick={() => {
                history.push(`/detail/${p.id}`);
              }}
              key={p.id}>
                <Post {...p}/>
              </Grid>
            )
          }
        })}
        <button onClick={() => dispatch(postActions.getPostFB(paging.next))}>추가</button>
        </Grid>
        </InfinityScroll>
    </React.Fragment>
  );
}

export default Main;