import {firestore} from '../../firebase'

const dict_db = firestore.collection('cat_dictionary')

//action

const LOAD_DICT = 'dict/LOAD_DICT';
const ADD_DICT = 'dict/ADD_DICT';
const UPDATE_DICT = 'dict/UPDATE_DICT';
const REMOVE_DICT = 'dict/REMOVE_DICT';

const initialState = {
  list: [
    ['골골송', '기분이 좋을 때 내는 울음 소리', '우리 고양이가 골골송을 불러줬어!']
  ]
}

//action creators
export const loadDict = (dict) => {
  return {type: LOAD_DICT, dict}
}

export const addDict = (dict) => {
  return {type: ADD_DICT, dict}
}

export const removeDict = (dict) => {
  return {type: REMOVE_DICT, dict}
}

//firebase
export const loadDictFB = () => {
  return function(dispatch) {
    dict_db.get().then((docs) => {
      let dict_data = [];

      docs.forEach((doc) => {
        if(doc.exists){
          dict_data = [...dict_data,{id:doc.id, ...doc.data()}];
        }
      })
      dispatch(loadDict(dict_data));
    });
  }
}

export const addDictFB = (input_text) => {
  return function(dispatch) {
    let dict_data = {
      word: input_text.word,
      description: input_text.description,
      example: input_text.example,
    };

    dict_db.add(dict_data).then((doc) => {
      dict_data = {...dict_data, id:doc.id};

      dispatch(addDict(dict_data));
    })
    .catch((err) => {
      window.alert('오류가 났어요! 나중에 다시 시도해주세요!')
    });
  };
};

export const removeDictFB = (dict) => {
  return function (dispatch, getState) {
    const _dict_data = getState().dict.list[dict];
    if(!_dict_data.id) {
      return;
    }

    dict_db
      .doc(_dict_data.id)
      .delete()
      .then((res) => {
        dispatch(removeDict(dict));
      })
      .catch((err) => {
        console.log('err');
    });
  };
};


//reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'dict/LOAD_DICT': {
      if(action.dict.length > 0) {
        return {list: action.dict}
      }
      return state;
    };

    case 'dict/ADD_DICT': {
      const new_dict_list = [
        //기존 배열, 새 배열
        ...state.list, action.dict,
      ]
      return {list: new_dict_list}
    };

    case 'dict/REMOVE_DICT': {
      const dict_list = state.list.filter((l,idx) => {
        if(idx !== action.dict) {
          return l;
        }
      });
      return {list:dict_list}
    };
    default: return state;
  }
}