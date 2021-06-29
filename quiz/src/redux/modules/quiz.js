//Action

const GET_QUIZ = 'quiz/GET_QUIZ';
const ADD_ANSWER = 'quiz/ADD_ANSWER';
const RESET_ANSWER = 'quiz/RESET_ANSWER';

const initialState = {
  name: '가을',
  score_texts: {
    30: '가을 : 뭐..아직 멀었네..ㅎ',
    50: '가을 : 가을이의 랜선 집사가 되기 위해서는 분발해야한다냥!',
    70: '가을 : 조금 더 친하게 지내자냥!',
    90: '가을 : 기분이다! 골골송!',
    100: '가을 : 진정한 가을이의 랜선 이모(삼춘)으로 허락한다냥:)'
  },
  answers: [],
  quiz: [
      {question:'가을이의 성별은 여자이다.', answer:'o'},
      {question:'가을이는 2살이다.', answer:'o'},
      {question:'가을이는 투명 해먹을 무서워한다', answer:'x'},
      {question:'가을이는 건식 간식을 싫어한다.', answer:'o'},
      {question:'가을이는 고양이 지능 테스트에서 발바닥이 먼저 닿았다', answer:'x'},
      {question:'가을이의 종은 스노우슈이다.', answer:'o'},
      {question:'가을이는 파란 눈을 가졌다.', answer:'o'},
      {question:'가을이는 엄마를 좋아한다.', answer:'o'},
      {question:'가을이는 길냥이 출신이다', answer:'x'},
      {question:'가을이를 사랑하나요?', answer:'o'},
  ],
}

//action creators
export const getQuiz = (quiz_list) => {
  return {type: GET_QUIZ, quiz_list}
};

export const addAnswer = (answer) => {
  return {type: ADD_ANSWER, answer}
};

export const resetAnswer = () => {
  return {type: RESET_ANSWER}
};

//reducer
export default function reducer(state = initialState, action={}) {
  switch(action.type) {
    case 'quiz/GET_QUIZ': {
      return {...state, quiz:action.quiz_list}
    };

    case 'quiz/ADD_ANSWER': {
      return {...state, answers: [...state.answers, action.answer]}
    };

    case 'quiz/RESET_ANSWER': {
      return {...state, answers: []}
    };

    default:
      return state;
  }
}