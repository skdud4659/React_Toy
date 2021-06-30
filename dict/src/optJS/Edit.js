import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from 'styled-components';
import image from '../img/Paw.PNG'
import { removeDictFB, updateDictFB } from '../redux/modules/dict';

const Edit = (props) => {
  const dispatch = useDispatch();
  const list =useSelector((state) => state.dict.list);

  const input_word = React.useRef(null);
  const input_description = React.useRef(null);
  const input_example = React.useRef(null);

  let data_index = parseInt(props.match.params.index);

  return (
    <Wrap>
      <BoardContainer>
        <Top>
            <LeftPaw src={image}/>
            <h2>단어 수정하기</h2>
            <RightPaw src={image}/>
        </Top>
        <BoardLists>
            <div>
              <small>Word</small>
              <textarea ref={input_word}>{list[data_index].word}</textarea>
            </div>
            <div>
              <small>Description</small>
              <textarea ref={input_description}>{list[data_index].description}</textarea>
            </div>
            <div>
              <small>Example</small>
              <textarea ref={input_example}>{list[data_index].example}</textarea>
            </div>
        </BoardLists>
      </BoardContainer>
      <AddBtn 
        onClick = {() => {
          let input_text = {
            word: input_word.current.value,
            description: input_description.current.value,
            example: input_example.current.value
          }
          dispatch(updateDictFB(data_index, input_text));
          window.setTimeout(()=> {
            props.history.goBack()
          },500);
        }}>완료하기</AddBtn>
    </Wrap>
  );
}

const Wrap = style.div`
  width: 100vw;
  height: 100vh;
`;

const BoardContainer = style.div`
  width: 100%;
  height: 93%;
`;

const Top = style.div`
  width: 100%;
  height: 8%;
  background-color:#debd96;
  display: flex;
  justify-content: space-evenly;
  & h2 {
    margin: 0px;
    line-height: 50px;
  }
`;

const LeftPaw = style.img`
  width: 15%;
  height: 100%;
`;

const RightPaw = style.img`
  width: 15%;
  height: 100%;
`;

const BoardLists = style.div`
  width: 90%
  height: 88%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-contents: space-around;
  & div {
    border: 1px solid #9e8260;
    height: 150px;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 10px;
    margin-bottom : 5%;
  }
  & small {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 5px;
    text-decoration: underline;
    margin-bottom: 20px;
    background-color: #debd96;
  }

  & textarea {
    height: 90px;
    resize: none;
    padding: 10px;
    border: 1px solid #9e8260;
  }
`;

const AddBtn = style.button`
  width: 100px;
  border-radius: 20px;
  background-color: #debd96;
  border: none;
  margin: auto;
  display: block;
`;

export default Edit;