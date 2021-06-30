import React from 'react'
import style from 'styled-components';
import image from './Paw.PNG'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddBoxIcon from '@material-ui/icons/AddBox';

import {useDispatch, useSelector} from 'react-redux';
import { removeDictFB,loadDictFB } from './redux/modules/dict';


const Board = (props) => {
  const dispatch = useDispatch()
  const _list =useSelector((state) => state.dict.list);

  console.log(_list)

  React.useEffect(() => {
    dispatch(loadDictFB());
  }, []);

  return (
    <Wrap>
      <BoardContainer>
        <Top>
            <LeftPaw src={image}/>
            <h2>집사 용어 사전</h2>
            <RightPaw src={image}/>
        </Top>
        <ScrollBox>
          {_list.map((l,idx) => {
            return (
              <BoardLists>
                <List key={idx}>
                  <div>
                    <Delbox>
                      <small>Word</small>
                      <div>
                        <EditBtn
                          key={idx}
                          onClick={() => {
                          props.history.push('/edit/'+idx)
                        }}>
                          수정
                        </EditBtn>
                        <DeleteBtn onClick={() => {
                        dispatch(removeDictFB(idx));
                        }}>삭제
                        </DeleteBtn>
                      </div>
                    </Delbox>
                    <p>{l.word}</p>
                  </div>
                  <div>
                    <small>Description</small>
                    <p>{l.description}</p>
                  </div>
                  <div>
                    <small>Example</small>
                    <Ex>{l.example}</Ex>
                  </div>
                </List>
              </BoardLists>
            )
          })}
        </ScrollBox>
      </BoardContainer>
      <Btns>
          <ExpandLessIcon style={{fontSize: 45, color: "#9e8260"}}/>
          <AddBoxIcon
          onClick = {() => {
            props.history.push('/write')
          }}style={{fontSize: 45, color: "#9e8260"}}/>
      </Btns>
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

const ScrollBox = style.div`
  height: 90%;
  overflow: scroll;
`;

const BoardLists = style.div`
  width: 90%
  height: 88%;
  margin: 3%;
  border: 1px solid #9e8260;
  display: flex;
  flex-direction: column;
`;

const List = style.div`
  height: 30%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  & small {
    text-decoration: underline;
  }

  & p {
    margin: 5px;
  }
`;

const Ex = style.p`
  color: #0095c9;
`;

const Delbox = style.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = style.button`
    border: none;
    margin-right: 10px;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background-color: #debd96;
`;

const EditBtn = style.button`
    border: none;
    margin-right: 10px;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background-color: white;
    border: 1px solid #debd96;
`;

const Btns = style.div`
  width: 100%;
  display:flex;
  justify-content: space-between;
  position: fixed;
`;


export default Board;