import React from 'react';
import style from 'styled-components';
import startImg from './img/quiz.PNG';
import TinderCard from 'react-tinder-card'

import Result from './Result'

import {useSelector, useDispatch} from 'react-redux';
import {addAnswer} from './redux/modules/quiz'

const Quiz = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);
  const quiz = useSelector((state) => state.quiz.quiz);

  const num = answers.length;

  const onSwipe = (direction) => {
    let _answer = direction === 'left' ? 'o' : 'x'

    if(_answer === quiz[num].answer){
      dispatch(addAnswer(true));
    } else{
      dispatch(addAnswer(false));
    }
  }

  if (num>quiz.length-1) {
    return <Result/>;
  }

  return (
    <Wrap>
      <QuizNum>{num+1}번 문제</QuizNum>
      {quiz.map((l,idx)=> {
        if(num === idx) {
          return <Question key={idx}>{l.question}</Question>
        }
      })}
      
      <AnswerChk>
        {quiz.map((l,idx) => {
          if (idx === num) {
            return (
              <DragImg key={idx}>
                <TinderCard
                  onSwipe={onSwipe}>
                  <img src={startImg}/>
                </TinderCard>
              </DragImg>
            )
          }
        })}
        <AnswerZone>
          <Answer>o</Answer>
          <Answer>x</Answer>
        </AnswerZone>
      </AnswerChk>
    </Wrap>
  );
};

const Wrap = style.div`
  text-align: center;
`;

const QuizNum = style.p`
  font-weight: bold;
  background-color: #fbe9c2;
  border-radius: 20px;
  width: 100px;
  height: 20px;
  padding: 5px;
  margin: 3% auto;
`;

const Question = style.h2`
  margin: 8% 0px;
`;

const AnswerChk = style.div`
  width: 100%;
  height: 100%;
`;

const DragImg = style.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin-top: 7%;
  & img {
    max-width: 230px;
  }
`;

const AnswerZone = style.div`
  display: flex;
  justify-content: space-around;
  
`;

const Answer = style.div`
  width:50%
  align-items: center;
  font-size: 12em;
  color: #fbe9c2;
  margin-bottom:25%;
`;

export default Quiz