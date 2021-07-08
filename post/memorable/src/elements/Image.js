import React from 'react';
import styled from 'styled-components';
import postEx from '../img/main.jpg'

const Image = (props) => {
  const {src, shape, size} = props

  const styles = {
    shape:shape,
    size:size,
    src:src
  }

  //comments
  if(shape === "profile") {
    return (
      <CircleImage {...styles}/>
    )
  }

  //write edit
  if(shape === 'preview') {
    return (
        <PreviewImage {...styles}></PreviewImage>
    )
  }

  //detail
  //write edit
  if(shape === 'detail') {
    return (
        <DetailImage {...styles}></DetailImage>
    )
  }

  //main
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
}

Image.defaultProps = {
  src: postEx,
  size: "35",
  shape: 'circle',
}

const PreviewImage = styled.div`
  width:100%;
  height: 100%;
  padding-top: 75%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const CircleImage = styled.img`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageDefault = styled.div`
  width:100%;
  height: 100%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const DetailImage = styled.div`
  padding-top: 75%;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default Image;