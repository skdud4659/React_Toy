import React, { Children } from 'react';
import styled from 'styled-components'

const Text = (props) => {
  const {color, bold, size, width, children, margin, is_over} = props

  const styles = {
    color:color,
    bold:bold,
    size:size,
    margin:margin,
    is_over:is_over,
    width:width
  }

  if(is_over === "true") {
    return (
      <Over {...styles}>{children}</Over>
    )
  }

  return (
    <React.Fragment>
      <P {...styles}>{children}</P>
    </React.Fragment>
  );
}

Text.defaultProps = {
  color: "black",
  bold: false,
  size: "14px",
  children: null,
  margin: "0px",
  is_over: false,
  width: "100%"
}

const P = styled.p`
  width:${(props) => props.width};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold? '700' : '400'};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
`;

const Over = styled.p`
  color: ${(props) => props.color};
  font-weight: ${(props) => props.bold? '700' : '400'};
  font-size: ${(props) => props.size};
  position: ${(props) => props.is_over? 'absolute' : ''};
  text-align: center;
  width:100%;
`;

export default Text;