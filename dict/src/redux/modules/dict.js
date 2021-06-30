import {firestore} from '../../firebase'

const dict_db = firestore.collection('cat_dictionary')

//action

const LOAD_DICT = 'dict/LOAD_DICT';
const ADD_DICT = 'dict/ADD_DICT';
const UPDATE_DICT = 'dict/UPDATE_DICT';
const REMOVE_DICT = 'dict/REMOVE_DICT';

const initialState = {
  list: [],
}

//action creators
export const loadDict = (dict) => {
  return {type: LOAD_DICT, dict}
}

export const addDict = (dict_data) => {
  return {type: ADD_DICT, dict_data}
}

export const removeDict = (dict) => {
  return {type: REMOVE_DICT, dict}
}

export const updateDict = (data_index, _dict_data) => {
  return {type: UPDATE_DICT, data_index, _dict_data}
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
      console.log(dict_data)
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

    dict_db.add(dict_data).then(docRef => {
      dict_data = {...dict_data, id:docRef.id};
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

export const updateDictFB = (data_index, input_text) => {
  return function (dispatch, getState) {
    const _dict_data = getState().dict.list[data_index];

    let input_data = {
      word: input_text.word,
      description: input_text.description,
      example: input_text.example,
    }

    if(!_dict_data.id) {
      return;
    }

    dict_db.doc(_dict_data.id).update(input_data).then((docRef) => {
      input_data = {...input_data, id:_dict_data.id}
      dispatch(updateDict(data_index, input_data));
    })
    .catch((err) => {
      console.log('err')
    });
  };
};

//reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'dict/LOAD_DICT': {
      let dict_data = [...state.list];

      const dict_ids = state.list.map((r,idx) => {
        return r.id;
      });
      const dict_data_fb = action.dict.filter((r,idx) => {
        if(dict_ids.indexOf(r.id) === -1) {
          dict_data = [...dict_data,r];
        }
      });
      return {...state, list: dict_data}
    };

    case 'dict/ADD_DICT': {
      return {...state, list: [...state.list, action.dict_data]}
    }

    case 'dict/REMOVE_DICT': {
      const dict_list = state.list.filter((l,idx) => {
        if(idx !== action.dict) {
          return l;
        }
      });
      return {list:dict_list}
    };

    case 'dict/UPDATE_DICT': {
      const update = action._dict_data;
      console.log(update)
      const dict_list =state.list.map((l,idx) => {
        if(idx === action.data_index) {
          return update;
        } else {
          return l;
        }
      })
      console.log(dict_list)
      return {list: dict_list}
    }
    default: return state;
  }
}