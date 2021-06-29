import React from 'react';
import style from 'styled-components';
import startImg from './img/main.jpg';

import {useDispatch, useSelector} from 'react-redux';
import {addUserName} from './redux/modules/rank'

const Start = (props) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.quiz.name);

  const input_text = React.useRef(null);

  return (
    <Wrap>
      <img src={startImg}/>
      <Title>나는 <span>{name}</span>에 대해 얼마나 알고 있을까?</Title>
      <NameBox type='text' placeholder='내 이름' ref={input_text}/>
      <StartBtn type='button' onClick={() => {
        dispatch(addUserName(input_text.current.value));
        props.history.push('/quiz')
      }}>시작하기</StartBtn>
    </Wrap>
  );
};

const Wrap = style.div`
  width: 90%;
  height: 80%;
  margin: auto;
  padding: 18% 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & img {
    margin: 0px auto;
    width: 210px;
    height: 210px;
  }
`;

const Title = style.h2`
  margin: 10% 0px;
  & span {
    background-color: #fbe9c2;
    padding: 3px;
    border-radius: 20px;
  }
`;

const NameBox = style.input`
  width: 80%;
  height: 20px;
  padding: 5px;
  border-radius: 20px;
  margin: 0px auto;
  &:focus {
    outline: none;
    border: 1px solid #8b550e;
  }
`;

const StartBtn = style.button`
  width: 100px;
  height: 30px;
  background-color: #fbe9c2;
  margin: 15% auto;
  border-radius: 20px;
  border: none;
  &:hover {
    background-color: #8b550e;
    font-weight: bold;
    color: white;
  }
`;



export default Start