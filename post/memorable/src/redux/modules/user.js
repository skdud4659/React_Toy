//로그인에 필요한 액션 - get
//로그아웃에 필요한 액션 - delete
//회원가입에 필요한 액션 - add

import firebase from "firebase/app";
import "firebase/auth";

import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import { deleteCookie, setCookie } from "./cookie";
import {history} from '../configStore';

import {auth} from '../../shared/firebase'
//actions
const SET_USER = "SET_USER";
const DELETE_USER = 'DELETE_USER';
const GET_USER = 'GET_USER'; 

//action creators
const setUser = createAction(SET_USER, (user) => ({user}));
const deleteUser = createAction(DELETE_USER, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));

//initialState
const initialState = {
  user: null,
  is_login: false,
}

//firebase
const signUpFB = (id, pwd, user_name) => {
  return function (dispatch, getState) {
    //인증 방법으로 계정 생성
    auth.createUserWithEmailAndPassword(id, pwd)
  .then((user) => {
    //데이터가 뒤죽박죽 나오고, 닉네임을 받아서 회원가입하지 않기 때문에 맞춰줘야함
    console.log(user);

    //프로필 업데이트
    auth.currentUser
      .updateProfile({
        //닉네임 = displayName으로 콘솔에 표출됨
        displayName: user_name,
      })
        //데이터 형식 맞춰주기
        .then(() => {
          dispatch(
            setUser({
              user_name:user_name,
              id:id,
              user_profile:'',
              uid:user.user.uid,
            })
          );
          //회원가입 성공 후 메인 페이지로 이동
          history.replace('/')
        })
        .catch((error) => {
          console.log(error)
        });
  })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("회원가입에 문제가 있어요! 잠시후 다시 시도해주세요.")
      console.log(errorCode, errorMessage)
    });
  };
};

const logInFB = (id, pwd) => {
  return function (dispatch, getState) {
    //로그인 상태 유지
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
        //회원가입과 마찬가지로 역시나 데이터가 뒤죽박죽 나옴
        console.log(user)

        //데이터 형식 맞춰주기
        dispatch(
          setUser({
              user_name:user.user.displayName,
              id:id,
              user_profile:'',
              uid:user.user.uid,
          })
        );
        history.push('/');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert('로그인에 문제가 있어요! 잠시후 다시 시도해주세요.')
        console.log(errorCode, errorMessage);
      });
    });
  };
};

const loginchkFB = () => {
  return function (dispatch, getState) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name:user.displayName,
            user_profile:'',
            id:user.email,
            uid:user.uid,
          })
        );
      } else {
        dispatch(deleteUser())
      }
    });
  }
}

const logoutFB = () => {
  return function (dispatch, getState) {
    auth.signOut().then(() => {
      dispatch(deleteUser());
      window.location.href='/'
    })
  }
}


//reducer
export default handleActions (
  {
    [SET_USER]: (state,action) => produce(state, (draft) => {
      setCookie("is_login", "success");
      draft.user = action.payload.user;
      draft.is_login = true;
    }),

    [DELETE_USER]: (state,action) => produce(state, (draft) => {
      deleteCookie("is_login");
      draft.user = null;
      draft.is_login = false;
    }),

    [GET_USER] : (state, action) => produce(state, (draft) => {

    }),
  },
  initialState
);

//export
const actionCreators = {
  setUser,
  deleteUser,
  getUser,

  signUpFB,
  logInFB,
  loginchkFB,
  logoutFB
};

export {actionCreators}