import React from 'react';
import style from 'styled-components';
import startImg from './img/main.jpg';

import {useSelector, useDispatch, useStore} from 'react-redux';
import { addRankFB } from './redux/modules/rank';

const Comment = (props) => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.quiz.name);
  const answers = useSelector((state) => state.quiz.answers);
  const user_name = useSelector((state) => state.rank.user_name)

  const input_text = React.useRef(null);

  let correct = answers.filter((answer) => {
    return answer;
  })

  let score = (correct.length / answers.length) * 100;

  return (
    <Wrap>
      <img src={startImg}/>
      <Title><span>{name}</span>에게 한 마디</Title>
      <NameBox type='text' placeholder='가을이에게 하고 싶은 말' ref={input_text}/>
      <RankBtn
      type='button'
      onClick={() => {
        let rank_info = {
          score: parseInt(score),
          name: user_name,
          msg: input_text.current.value,
          current:true,
        }
        dispatch(addRankFB(rank_info))
        props.history.push("/rank")
      }}
      >한 마디 하고 랭킹 보러 가기</RankBtn>
    </Wrap>
  );
};

const Wrap = style.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 20% 5%;
  display: flex;
  flex-direction: column;
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

const RankBtn = style.button`
  width: 250px;
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



export default Comment