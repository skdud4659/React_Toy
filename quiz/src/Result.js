import React from 'react';
import style from 'styled-components';

import {useSelector, useDispatch} from 'react-redux';
import { withRouter } from "react-router";

const Result = (props) => {
  const name = useSelector((state) => state.quiz.name);
  const score_texts = useSelector((state) => state.quiz.score_texts);

  const answers = useSelector((state) => state.quiz.answers);

  let correct = answers.filter((answer) => {
    return answer;
  })

  let score = (correct.length / answers.length) * 100;

  let score_text = '';

   // Object.keys는 딕셔너리의 키값을 배열로 만들어주는 친구
  Object.keys(score_texts).map((s, idx) => {
    if (idx === 0) {
      score_text = score_texts[s];
    }
    score_text = parseInt(s) <= score ? score_texts[s] : score_text;
  });

  return (
    <Wrap>
      <QuizResult>
        <span>{name}</span>
        퀴즈에 <br/>대한 내 점수는?
      </QuizResult>
      <Total>
        <span>{score}</span>
        점
      </Total>
      <Ment>{score_text}</Ment>
      <Button
        onClick={() => {
          props.history.push("/comment");
        }}
      >
        {name}에게 한마디
      </Button>
    </Wrap>
  );
}

const Wrap = style.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 30% 5%;
  display: flex;
  flex-direction: column;
`;

const QuizResult = style.h2`
  & span {
    padding: 8px;
    border-radius: 20px;
    background-color: #fbe9c2;
  }
`;

const Total = style.h2`
  & span {
    padding: 8px;
    border-radius: 30px;
    background-color: #fbe9c2;
  }
`;

const Ment = style.p`
  margin: 10% 0px 20% 0px;
`;

const Button = style.button`
  width: 80%;
  height: 30px;
  background-color: #fbe9c2;
  border-radius: 20px;
  border: none;
  margin: 0px auto 5% auto;
`;

export default withRouter(Result)