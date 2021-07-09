import React from 'react';
import styled from 'styled-components'

import hateAcorn from '../img/hate.png'
import likeAcorn from '../img/like.PNG'

const Like = (props) => {
  const icon_url = props.is_like? likeAcorn : hateAcorn;

  return (
    <React.Fragment>
      <LikeBtn onClick={props._onClick} icon_url={icon_url}></LikeBtn>
    </React.Fragment>
  );
}

const LikeBtn = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  background: url(${(props) => props.icon_url});
  background-size: cover;
  cursor: pointer;
  background-color: white;
`;

export default Like;