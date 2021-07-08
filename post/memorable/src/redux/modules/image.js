import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import {history} from '../configStore';

import { storage } from "../../shared/firebase";

//action
const UPLOADING = 'UPLOADING';
const UPLOAD_IMAGE ='UPLOAD_IMAGE';
const SET_PREVIEW ='SET_PREVIEW';

//action creators
const uploading = createAction(UPLOADING, (image) => ({image}));
const upload_image = createAction(UPLOAD_IMAGE, (image) => ({image}));
const set_preview = createAction(SET_PREVIEW, (preview) => ({preview}));

//initial states
const initialState = {
  image_url : '../../img/IMG_2246.JPG',
  uploading : false,
  preview : null,
}

//firebase
const uploadImageFB = (image) => {
  return function (dispatch, getState) {
    dispatch(uploading(true));

     //upload
    // console.log(`images/${new Date().getTime()}_${image.name}`);
    const _upload = storage.ref(`images/${image.name}`).put(image)

    _upload.then((snapshot) => {
      console.log(snapshot);
      //다운로드
      snapshot.ref.getDownloadURL.then((url) => {
        console.log(url);
        dispatch(upload_image(url));
      });
    }).catch(err => {
      dispatch(uploading(false))
    });
  };
};

//reducer
export default handleActions (
  {
  [UPLOAD_IMAGE] : (state, action) => produce(state, (draft) => {
    draft.image_url = action.payload.image_url;
    draft.uploading =false;
  }),

  [UPLOADING] : (state, action) => produce(state, (draft) => {
    draft.uploading = action.payload.uploading;
  }),

  [SET_PREVIEW] : (state, action) => produce(state, (draft) => {
    draft.preview = action.payload.preview;
  }),
}, initialState);

const actionCreators = {
  upload_image,
  set_preview,
  uploadImageFB,
}

export {actionCreators}
