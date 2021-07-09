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
const LIKE_TOGGLE = 'LIKE_TOGGLE'

//action creators
const addPost = createAction(ADD_POST, (post) => ({post}));
const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const deletePost = createAction(DELETE_POST, (post) => ({post}));
const updatePost = createAction(UPDATE_POST, (post_id, post) => ({post_id, post}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));
const likeToggle = createAction(LIKE_TOGGLE, (post_id, is_like=null) => ({
  post_id, is_like
}))

//initialState
const initialState = {
  list:[],
  paging: {start:null, next:null, size:4},
  is_loading:false,
}

const initialPost = {
  // user_info: {
  //   id: 0,
  //   user_name: 'fall',
  //   user_profile: '../../img/IMG_2246 2.jpg'
  // },
  image_url: '../../img/IMG_2246 2.jpg',
  like_cnt:0,
  is_like: false,
  contents: '가을',
  comment_cnt: 0,
  insert_d: moment().format("MMM DD, YYYY"),
  insert_dt : moment().format("YYYY-MM-DD hh:mm:ss a")
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
      insert_dt : moment().format("YYYY-MM-DD hh:mm:ss a")
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

//무한스크롤 시 size=5추가
const getPostFB = (start = null, size=4) => {
  return function (dispatch, getState, { history }) {

    let _paging = getState().post.paging;
    
    if(_paging.start && !_paging.next){
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc")

    //시작점 정보
    if(start){
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next: docs.docs.length === size+1? docs.docs[docs.docs.length -1] : null,
          size: size,
        }

        docs.forEach((doc) => {
          let _post = doc.data();

          // ['commenct_cnt', 'contents', ..]
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

          post_list.push(post);
        });

        post_list.pop();

        if(getState().user.user){
          dispatch(setIsLike(post_list, paging));
        } else {
          dispatch(setPost(post_list, paging)); //paging
        }
      });
  };
};

const toggleLikeFB = (post_id) => {
  return function (dispatch, getState) {
    if(!getState().user.user) {
      return;
    }

    const postDB = firestore.collection('post');
    const likeDB = firestore.collection('like');

    const _idx = getState().post.list.findIndex((p) => p.id === post_id);

    const _post = getState().post.list[_idx];

    const user_id = getState().user.user.uid;
    
    // 좋아요한 상태라면 해제하기
    // 해제 순서
    // 1. likeDB에서 해당 데이터를 지우고,
    // 2. postDB에서 like_cnt를 -1해주기
    if(_post.is_like) {
      likeDB
        .where("post_id", "==", _post.id)
        .where("user_id", "==", user_id)
        .get()
        .then((docs) => {
          // batch는 파이어스토어에 작업할 내용을 묶어서 한번에 하도록 도와줌
          let batch = firestore.batch();

          docs.forEach((doc) => {
            batch.delete(likeDB.doc(doc.id));
          });

          batch.update(postDB.doc(post_id), {
            like_cnt: _post.like_cnt -1 < 1 ? _post.like_cnt : _post.like_cnt -1,
          });

          batch.commit().then(() => {
            console.log(_post.is_like)
            dispatch(likeToggle(post_id, !_post.is_like));
          });
        })
        .catch((err)=> {
          console.log(err);
        });
    } else {
      // 좋아요 해제 상태라면 좋아요 하기
      // 좋아요 순서
      // 1. likeDB에서 해당 데이터를 넣고,
      // 2. postDB에서 like_cnt를 +1해주기

      likeDB.add({post_id:post_id, user_id:user_id}).then(doc => {
        postDB.doc(post_id).update({like_cnt:_post.like_cnt+1}).then(doc => {
          dispatch(likeToggle(post_id, !_post.is_like));
        });
      });
    }
  };
};

const setIsLike = (_post_list, paging) => {
  return function(dispatch, getState) {
    if(!getState().user.is_login) {
      return;
    }
    // 이제 좋아요 리스트를 가져올거예요 :)
    // 1. post_list에 들어있는 게시물의 좋아요 리스트를 가져오고,
    // 2. 지금 사용자가 좋아요를 했는 지 확인해서,
    // 3. post의 is_like에 넣어줄거예요!
    const likeDB = firestore.collection('like');
    const post_ids = _post_list.map((p) => p.id);

    let like_query = likeDB.where("post_id", "in", post_ids);

    like_query.get().then((like_docs) => {
      let like_list = {};
      like_docs.forEach((doc) => {
        if(like_list[doc.data().post_id]) {
          like_list[doc.data().post_id] = [...like_list[doc.data().post_id],
        doc.data().user_id,
      ];
        } else {
          like_list[doc.data().post_id] = [doc.data().user_id];
        }
      });
      const user_id = getState().user.user.uid;
      let post_list = _post_list.map((p) => {
        if(like_list[p.id] && like_list[p.id].indexOf(user_id) !== -1) {
          return {...p, is_like: true};
        }
        return p;
      });
      dispatch(setPost(post_list, paging));
    });
  };
};

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
          // dispatch(setPost([post]));
          dispatch(setIsLike([post]));
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
      // draft.list = draft.list.reduce((acc,cur) => {
      //   if(acc.findIndex((a) => a.id === cur.id) === -1){
      //     return [...acc,cur];
      //   } else {
      //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
      //     return acc;
      //   }
      // },[])

      // if(action.payload.paging) {
        draft.paging = action.payload.paging;
      // }
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
    }),

    [LIKE_TOGGLE]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
      draft.list[idx].is_like = action.payload.is_like;
    }),
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
  toggleLikeFB,
}

export {actionCreators}
