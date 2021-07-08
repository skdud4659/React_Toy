import React from 'react';
import Upload from '../components/Upload';
import noPreview from '../img/IMG_2250 2.JPG';

import {Grid, Button, Image, Input, Text} from '../elements'

import {useDispatch, useSelector} from 'react-redux';
import {actionCreators as postActions} from '../redux/modules/post';
import {actionCreators as imageActions} from '../redux/modules/image';

import {history} from "../redux/configStore";

const WriteEdit = (props) => {
  const dispatch = useDispatch();
  //수정하려면 로그인상태, 이 전에 입력한 미리보기와 포스트가 필요하다.
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  //미리보기는 작성페이지, 수정페이지 둘 다 필요하다.
  const preview = useSelector((state) => state.image.preview);
  

  //라우팅으로 수정페이지는 작성 페이지에서 내용만 바꿔서 보여줄꺼고 데이터를 구분해서 가져와야하니까 post_id가 필요
  const post_id = props.match.params.id;
  //수정 상태는 포스트 아이디가 있을 경우 가능하다.
  const is_edit = post_id ? true : false;

  //포스트 내용은 변동될 수 있으니까 let / 아이디값이 같은 게시글을 post_list에서 받아온다.
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;
  //input_box 
  //수정의 경우 해당 포스트를 가져오면 포스트에 작성된 게시글을 띄우고 아닐 경우 작성할 수 있도록 빈칸
  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
     //화면이 라우팅 되었을 때 포스팅이 없는 경우 뒤로가기
    if(is_edit && !_post) {
      window.alert('포스트 정보에 오류가 있어요!')
      console.log('포스트 정보가 없어요!')
      history.goBack();

      return
    }

    //수정상태일 경우 id값으로 가져온 게시글의 image_url에서 미리보기를 가져온다.
    if(is_edit) {
      console.log(_post.contents)
      dispatch(imageActions.set_preview(_post.image_url))
    }
  },[])

  //BTNS
   //onchange e
  const input_contents = (e) => {
    setContents(e.target.value);
  };
  
  //add 
  const addBtn = () => {
    window.alert('게시글 작성이 완료되었어요!')
    dispatch(postActions.addPostFB(contents))
  }

  //edit
  const editBtn = () => {
    window.alert('게시글 수정이 완료되었어요!')
    dispatch(postActions.updatePostFB(post_id, {contents:contents}))
  }

  if (is_edit) {
    return (
      <React.Fragment>
        <Grid>
          <Grid>
          <Upload />
          </Grid>
          <Grid border="2px solid #E7E7E7">
            <Image
              shape="preview"
              src={preview ? preview : noPreview}/>
          </Grid>
          <Grid>
            <Input
              value={contents}
              multiline
              margin="10% 0%;"
              padding="5%;"
              _onChange={input_contents}/>
          </Grid>
          <Grid>
              <Button
                width="84px"
                height="36px"
                margin="5% auto"
                _onClick={editBtn}>
                <Text color={"white"} bold>수정 완료</Text>
              </Button>
          </Grid>
        </Grid>
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>
        <Grid>
          <Grid>
          <Upload />
          </Grid>
          <Grid border="2px solid #E7E7E7">
            <Image
              shape="preview"
              src={preview ? preview : noPreview}/>
          </Grid>
          <Grid>
            <Input
              value={contents}
              multiline
              margin="10% 0%;"
              padding="5%;"
              _onChange={input_contents}/>
          </Grid>
          <Grid>
              <Button
                width="84px"
                height="36px"
                margin="5% auto"
                _onClick={addBtn}>
                <Text color={"white"} bold>글 남기기</Text>
              </Button>
          </Grid>
        </Grid>
    </React.Fragment>
  );
}

export default WriteEdit;