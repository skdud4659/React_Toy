import {firestore} from '../../firebase'

const rank_db = firestore.collection('rank');

//action

const ADD_USER_NAME = 'rank/ADD_USER_NAME'
const ADD_USER_MSG = 'rank/ADD_USER_MSG'
const ADD_RANK = 'rank/ADD_RANK'
const GET_RANK = 'rank/GET_RANK'
//firestore
const IS_LOADED = 'rank/IS_LOADED'

const initialState = {
  user_name: '',
  user_msg: '',
  use_score: '',
  ranking: [],
  current: false,
  is_loaded: false,
};

//action creators
export const addUserName = (user_name) => {
  return {type: ADD_USER_NAME, user_name}
};
export const addUserMsg = (user_msg) => {
  return {type: ADD_USER_MSG, user_msg}
};
export const addRank = (rank_info) => {
  return {type: ADD_RANK, rank_info}
};
export const getRank = (rank_list) => {
  return {type: GET_RANK, rank_list}
};
export const isLoaded = (loaded) => {
  return {type: IS_LOADED, loaded}
};

//파이어 베이스 통신 함수
export const addRankFB = (rank_info) => {
  return function (dispatch) {
    //데이터를 저장할 동안 스피너
    dispatch(isLoaded(false));

    let rank_data = {
      message : rank_info.msg,
      name: rank_info.name,
      score: rank_info.score,
    };
    rank_db.add(rank_data).then((doc) => {
      rank_data = {...rank_data, id: doc.id, current:true};
      console.log(rank_data)
      dispatch(addRank(rank_data));
    });
  }
}

export const getRankFB = () => {
  return function (dispatch) {
    rank_db.get().then((docs) => {
      let rank_data = [];

      docs.forEach((doc) => {
        rank_data = [...rank_data, {id:doc.id, ...doc.data()}];
      });

      dispatch(getRank(rank_data));
      dispatch(isLoaded(true));
    })
  }
}

//reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'rank/ADD_USER_NAME': {
      return {...state, user_name: action.user_name}
    }

    case 'rank/ADD_USER_MSG': {
      return {...state, user_msg: action.user_msg}
    }

    case 'rank/ADD_RANK': {
      return {...state, ranking: [...state.ranking, action.rank_info]}
    }

    case 'rank/GET_RANK': {
      let ranking_data = [...state.ranking];
      
      const rank_ids = state.ranking.map((r,idx) => {
        return r.id;
      });
      const rank_data_fb = action.rank_list.filter((r,idx) => {
        if(rank_ids.indexOf(r.id) === -1) {
          ranking_data = [...ranking_data, r];
        }
      })
      console.log(ranking_data)
      return {...state, ranking: ranking_data}
    }

    case 'rank/IS_LOADED': {
      return {...state, is_loaded:action.loaded};
    }

    default:
      return state;
  }
}