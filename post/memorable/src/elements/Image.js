import React from 'react';
import styled from 'styled-components';
import postEx from '../img/main.jpg'

const Image = (props) => {
  const {width, height, src, shape, size} = props

  const styles = {
    width:width,
    height:height,
    size:size,
  }

  if(shape === "profile") {
    return (
      <CircleImage {...styles} src={src}/>
    )
  }

  return (
    <React.Fragment>
      <PostImage {...styles} src={src}/>
    </React.Fragment>
  );
}

Image.defaultProps = {
  src: postEx,
  width: "50%",
  height: "100%",
  size: "35",
  shape: null,
}

const PostImage = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const CircleImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
`;

export default Image;