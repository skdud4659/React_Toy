import React, { Children } from 'react';
import styled from 'styled-components'

const Button = (props) => {
  const {width, border, bg, children, margin, _onClick, height} = props

  const styles = {
    width:width,
    height:height,
    border: border,
    bg: bg,
    margin: margin,
  }

  return (
    <React.Fragment>
      <Btn onClick={_onClick} {...styles}>
        {children}
      </Btn>
    </React.Fragment>
  );
}

Button.defaultProps = {
  width: "100%",
  border: "none",
  bg: "",
  text:'',
  margin: false,
  _onClick: () => {},
}

const Btn = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  background-color: ${(props) => props.bg ? `background-color: ${props.bg}` : "#60C1DF"};
  margin: ${(props) => props.margin};
  display:block
`;

export default Button;