import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

import {storage} from "../shared/firebase";

import { Grid, Button, Text} from '../elements';


const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);

  const fileInput = React.useRef();

  const selectFile = (e) => {
    console.log(e.target.files[0]);
    
    const reader = new FileReader();
    const file = e.target.files[0];

    //파일 내용 읽어오기
    reader.readAsDataURL(file);

    //읽기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      //파일 컨텐츠
      console.log(reader.result);
      dispatch(imageActions.set_preview(reader.result))
    }
  }

  // 사진을 업로드하고자할때마다 버튼을 누르면 이상하니까 이걸 post.js로 넘겨서 수행
  // const uploadBtn = () => {
  //   if(!fileInput.current || fileInput.current.files[0].length === 0) {
  //     window.alert('사진을 선택해주세요!');
  //     return;
  //   }
  //   dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  // };

  return (
    <React.Fragment>
      <Grid>
      <input accept=".jpg, .JPG, .JPEG," type="file" ref={fileInput} onChange={selectFile} disabled={uploading}/>
        {/* <Button
          _onClick={uploadBtn}
        >
          <Text>업로드하기</Text></Button> */}
      </Grid>
    </React.Fragment>
  );
}

export default Upload;