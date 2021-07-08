//post에서 필요한 데이터
//ADD, GET, DELETE, UPDATE

import { createAction, handleActions} from 'redux-actions';
import { produce } from 'immer';
import {history} from '../configStore'
import { firestore, storage } from '../../shared/firebase';
import {actionCreators as imageActions} from '../modules/image';
import "moment"
import moment from "moment"

//actions
const ADD_POST = 'ADD_POST';
const SET_POST = 'SET_POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';
const LOADING = 'LOADING';

//action creators
const addPost = createAction(ADD_POST, (post) => ({post}));
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));
const updatePost = createAction(UPDATE_POST, (post_id, post) => ({post_id, post}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

//initialState
const initialState = {
  list:[],
  paging: {start:null, next:null, size:3},
  is_loading:false,
}

const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: 'fall',
  //   user_profile: '../../img/IMG_2246 2.jpg'
  // },
  image_url: '../../img/IMG_2246 2.jpg',
  contents: '가을',
  comment_cnt: 0,
  insert_d: moment().format("MMM DD, YYYY"),
  insert_dt : moment().format("YYYY-MM-DD hh:mm:ss")
}

//firestore
const addPostFB = (contents = "") => {
  return function (dispatch, getState) {
    const postDB = firestore.collection('post')

    const _user = getState().user.user;
    const user_info = {
      user_name:_user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents:contents,
      //이니셜포스트에 작성 시간을 썼는데 또 쓰는 이유 : 작성되는 시점이 다르기 때문!
      insert_d: moment().format("MMM DD, YYYY"),
      insert_dt : moment().format("YYYY-MM-DD hh:mm:ss")
    };

    console.log(_post)

    const _image = getState().image.preview;

    const _upload = storage
    //파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어주기! 혹시라도 중복이 생기지 않도록
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url")

    _upload
    //Upload파일에서 버튼을 매번 누를 수 없으니 post.js에서 처리 input에 입력된 url을 다운받아서 이걸 넣어줘서 업로드시킨다.
      .then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {;
            console.log(url)
            dispatch(imageActions.upload_image(url));
            return url;
          })
          .then ((url) => {
            postDB
            .add({...user_info, ..._post, image_url:url})
            .then((doc) => {
              let post = {user_info, ..._post, id:doc.id, image_url:url};
              dispatch(addPost(post));
              history.replace('/');

              dispatch(imageActions.set_preview(null));
          })
          .catch((err) => {
            window.alert('포스트 작성에 오류가 발생했어요! 잠시후 다시 시도해주세요.');
            console.log(err)
            });
          });
      })
      .catch((err) => {
        window.alert("앗! 이미지 업로드에 문제가 있어요!");
        console.log(err);
      });
  };
};


const getPostFB = (start=null, size=3) => {
  return function (dispatch, getState) {
    let _paging = getState().post.paging;
    if(_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    const postDB = firestore.collection('post');

    //게시글을 시간 역순으로 정리 (desc - 내림차순)
    let query = postDB.orderBy("insert_dt", "desc");
    if(start) {
      query = query.startAt(start);
    }

    query.limit(size+1).get().then((docs) => {
      let post_list = [];

      let paging = {
        start: docs.docs[0],
        size:size,
        next:docs.docs.length === size+1? docs.docs[docs.docs.length-1] : null,
      };

      docs.forEach((doc) => {
        let _post = doc.data();
        // ['commenct_cnt', 'contents', ..]
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            // 만약 추가하고자 하는 내용에 user_이 포함되지 않는다면
            if(cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                //user_info를 추가
                user_info: {...acc.user_info, [cur] : _post[cur]},
              };
            }
            //포함한다면
            return {...acc, [cur] : _post[cur]};
          },
          {id:doc.id, user_info: {}}
        );
        post_list.push(post);
      });
      console.log(post_list);

      post_list.pop();
      dispatch(setPost(post_list, paging));
    })
  }
}

const getOnePostFB = (id) => {
  return function(dispatch, getState) {
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();

        if(!_post) {
          return;
        }

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
          dispatch(setPost([post]));
      });
  }
}

const updatePostFB = (post_id=null, post={}) => {
  return function (dispatch, getState) {
    if(!post_id) {
      window.alert('게시글 정보에 오류가 있어요!')
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];


    const postDB = firestore.collection("post");

    if(_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(updatePost(post_id, {...post}));
          history.replace('/');
        });
        return;

    } else {
      const user_id = getState().user.user_id;
      const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url)
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({...post, image_url:url})
              .then((doc) => {
                dispatch(updatePost(post_id, {...post, image_url:url}));
                history.replace('/');
              });
          })
          .catch((err) => {
            window.alert("앗! 이미지 업로드에 문제가 있어요!");
            console.log("앗! 이미지 업로드에 문제가 있어요!", err);
          });
      })
    }
  }
}

const deletePostFB = (post_id=null) => {
  return function (dispatch, getState) {
    const postDB = firestore.collection("post");
    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    console.log(_post)

    postDB.doc(_post.id)
      .delete()
      .then((res) => {
        dispatch(deletePost(_post.id));
        history.replace('/')
      })
      .catch((err) => {
        console.log('err')
      })
  }
}

//reducer
export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),

    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.post_list);
      draft.list = draft.list.reduce((acc,cur) => {
        if(acc.findIndex((a) => a.id === cur.id) === -1){
          return [...acc,cur];
        } else {
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      },[])

      if(action.payload.paging) {
        draft.paging = action.payload.paging;
      }
      draft.is_loading = false;
    }),

    [DELETE_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post);
      if(idx !== -1) {
        draft.list.splice(idx,1);
      }
      
    }),

    [UPDATE_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

      draft.list[idx] = {...draft.list[idx], ...action.payload.post};
    }),

    [LOADING]: (state, action) => produce(state,(draft) => {
      draft.is_loading = action.payload.is_loading
    })
  },
  initialState
);

const actionCreators = {
  addPost,
  setPost,
  updatePost,
  deletePost,

  addPostFB,
  getPostFB,
  updatePostFB,
  deletePostFB,
  getOnePostFB,
}

export {actionCreators}
