import React from 'react';
import style from 'styled-components';

import {useDispatch, useSelector} from 'react-redux';
import { resetAnswer } from './redux/modules/quiz';
import {getRankFB} from './redux/modules/rank'

import Spinner from './Spinner';

const Rank = (props) => {
  const dispatch = useDispatch();
  const _ranking = useSelector((state) => state.rank.ranking)
  const is_loaded = useSelector((state) => state.rank.is_loaded)

  const user_rank = React.useRef(null);

  React.useEffect(() => {
    dispatch(getRankFB());
    if(!user_rank.current){
      return;
    }
    window.scrollTo({top: user_rank.current.offsetTop, left: 0, behavior: "smooth"});
  },[]);

  const ranking = _ranking.sort((a,b) => {
    return b.score - a.score;
  })
  console.log(ranking)

  if(!is_loaded) {
    return (<Spinner/>);
  }

  return (
    <Wrap>
      <YourPosition><span>{ranking.length}명</span>의 사람들 중 당신의 순위는?</YourPosition>
      <RankingList>
        {ranking.map((r,idx) => {
          if(r.current) {
            return (
              <Ranking key={idx} highlight={true} ref={user_rank}>
                <h2>{idx}등</h2>
                <Comments>
                  <p>{r.name}</p>
                  <p>{r.message}</p>
                </Comments>
              </Ranking>
            );
          }

          return (
            <Ranking key={idx}>
                <h2>{idx+1}등</h2>
                <Comments>
                  <p>{r.name}</p>
                  <p>{r.message}</p>
                </Comments>
              </Ranking>
          )
        })}
      </RankingList>
      <TryAgain onClick= {() => {
        dispatch(resetAnswer());
        window.location.href='/';
      }}>다시 하기</TryAgain>
    </Wrap>
  );
}

const Wrap = style.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding: 0% 5%;
  display: flex;
  flex-direction: column;
`;

const YourPosition = style.p`
  width: 100%;
  height: 5%;
  & span {
    background-color: #fbe9c2;
    padding: 5px;
    border-radius: 15px;
  }
`;

const RankingList = style.div`
  width: 100%
  height: 60%;
  overflow: auto;
  border: 1px solid #8b550e;
`;

const Ranking = style.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  background-color: ${props => props.highlight ? "#fbe9c2" : "white"};
  & h2 {
    border-right : 1px solid #8b550e;
    line-height: 60px;
    text-align: center;
  }
`;

const Comments = style.div`
  display: flex;
  flex-direction: column; 
  text-align: left;
  padding-left: 20px;
  align-content: space-around;
`;

const TryAgain = style.button`
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



export default Rank