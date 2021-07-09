//add get delete

import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer'
import "moment";
import moment from 'moment';

import firebase from 'firebase/app';
import { firestore, realtime } from "../../shared/firebase";
import {history} from '../configStore';

import {actionCreators as postActions} from './post'

//actions
const ADD_COMMENT = 'ADD_COMMENT';
const SET_COMMENT = 'SET_COMMENT';
// const DELETE_COMMENT = 'DELETE_COMMENT';
const LOADING = "LOADING";

//action creators
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id, comment
}));
const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id, comment_list
}));
// const deleteComment = createAction(DELETE_COMMENT, (post_id, comment) => ({
//   post_id, comment
// }));
const loading = createAction(LOADING, (is_loading) => ({
  is_loading
}));

//initialState
const initialState = {
  list:{},
  is_loading:false,
};

//firebase
const addCommentFB = (post_id, comments) => {
  return function (dispatch, getState) {
    const commentDB = firestore.collection("comment")
    const user_info = getState().user.user;

    let comment = {
      post_id:post_id,
      user_id:user_info.uid,
      user_name:user_info.user_name,
      user_profile: user_info.user_profile,
      contents:comments,
      insert_d: moment().format("MMM DD, YYYY"),
      insert_dt : moment().format("YYYY-MM-DD hh:mm:ss")
    };

    commentDB.add(comment).then((doc) => {
      const postDB =firestore.collection('post');
      comment = {...comment, id:doc.id};

      const post = getState().post.list.find((l)=>l.id === post_id)
      const increment = firebase.firestore.FieldValue.increment(1);

      console.log(post)
      postDB
        .doc(post_id)
        .update({comment_cnt:increment})
        .then((_post) => {
          console.log(post_id,comment)
          dispatch(addComment(post_id,comment));

          if(post) {
            dispatch(
              postActions.updatePost(post_id, {
                comment_cnt: parseInt(post.comment_cnt)+1,
              })
            );

          }
        });
    });
  };
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState) {
    if(!post_id) {
      return;
    }
    const commentDB = firestore.collection("comment");

    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list =[];

        docs.forEach((doc) => {
          list.push({...doc.data(), id:doc.id});
        });

        console.log(post_id, list)
        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        window.alert('댓글을 가져오는데 오류가 발생했어요!')
        console.log(err)
      });
  };
};

//reducer
export default handleActions (
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      const postID = action.payload.post_id;
      const comment = action.payload.comment;
      if(draft.list[postID]){
        draft.list[postID].unshift(comment)
      } else {
        draft.list[postID] = [];
        draft.list[postID].push(comment);
      } 
    }),
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    // [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {

    // }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading
    }),
  },
  initialState
);

const actionCreators = {
  addComment,
  setComment,
  // deleteComment,

  addCommentFB,
  getCommentFB
}

export {actionCreators}
