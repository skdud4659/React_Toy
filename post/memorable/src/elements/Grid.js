import React from 'react';
import styled from 'styled-components'

const Grid = (props) => {
  const {children, padding, box, rows, _onClick, is_flex, is_over, overflow, top, width, height, margin, bg, position, border, shadow, border_top} = props

  const styles = {
    is_flex: is_flex,
    padding: padding,
    width: width,
    margin: margin,
    bg: bg,
    height: height,
    position: position,
    border: border,
    shadow: shadow,
    top:top,
    rows:rows,
    overflow:overflow,
    is_over: is_over,
    border_top:border_top,
    box:box
  }

  if(top === "true") {
    return (
        <AddBox {...styles}>{children}</AddBox>
    );
  }

  if(rows === "true") {
    return (
        <RowBox {...styles}>{children}</RowBox>
    );
  }


  if(is_over) {
    return (
        <PositionBox {...styles}>{children}</PositionBox>
    );
  }

  if(box) {
    return (
        <Box {...styles}>{children}</Box>
    );
  }

  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
}

Grid.defaultProps = {
  children: null,
  padding:false,
  is_flex: false,
  width: "100%",
  margin: false,
  bg: false,
  position: false,
  border: "none",
  shadow: false,
  top:false,
  rows:false,
  overflow:false,
  is_over:false,
  border_top:"",
  _onClick: () => {},
  box:null
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => props.padding ? `padding: ${props.padding}` : ''};
  ${(props) => props.margin ? `margin: ${props.margin}` : ''};
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
  ${(props) => props.is_flex ?
    `display: flex; align-items: center; justify-content:space-between` : ''};
  ${(props) => props.position ? `position: fixed` : ''};
  ${(props) => props.border ? `border: ${props.border}` : ''};
  ${(props) => props.shadow ? `box-shadow: ${props.shadow}` : ''};
  ${(props) => props.overflow ? `overflow-y:scroll;` : ''};
`;

const AddBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => props.top ? `border-top: 2px solid ${props.top}` : ''};
  /* border-top: 2px solid #595959; */
  ${(props) => props.border_top ? `border-top: 2px solid ${props.border_top}` : ''};
  ${(props) => props.padding ? `padding: ${props.padding}` : ''};
  ${(props) => props.margin ? `margin: ${props.margin}` : ''};
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
  ${(props) => props.is_flex ?
    `display: flex; align-items: center; justify-content:space-between` : ''};
  ${(props) => props.position ? `position: fixed` : ''};
  ${(props) => props.shadow ? `box-shadow: ${props.shadow}` : ''};
  ${(props) => props.overflow ? `overflow-y:scroll;` : ''};
  ${(props) => props.is_over ? `position:relative;` : ''};
`;

const RowBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => props.padding ? `padding: ${props.padding}` : ''};
  ${(props) => props.margin ? `margin: ${props.margin}` : ''};
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
  ${(props) => props.rows ?
    `display: flex; align-items: center;` : ''};
  ${(props) => props.position ? `position: fixed` : ''};
  ${(props) => props.border ? `border: ${props.border}` : ''};
  ${(props) => props.shadow ? `box-shadow: ${props.shadow}` : ''};
  ${(props) => props.overflow ? `overflow-y:scroll;` : ''};
`;

const PositionBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => props.padding ? `padding: ${props.padding}` : ''};
  ${(props) => props.margin ? `margin: ${props.margin}` : ''};
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
  ${(props) => props.rows ?
    `display: flex; align-items: center;` : ''};
  ${(props) => props.border ? `border: ${props.border}` : ''};
  ${(props) => props.shadow ? `box-shadow: ${props.shadow}` : ''};
  ${(props) => props.overflow ? `overflow-y:scroll;` : ''};
  ${(props) => props.is_over ? `position:relative;` : ''};
`;

const Box = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => props.padding ? `padding: ${props.padding}` : ''}
  ${(props) => props.margin ? `margin: ${props.margin}` : ''}
  ${(props) => props.bg ? `background-color: ${props.bg}` : ''}
  ${(props) => props.is_between ?
  `display: flex; align-items:center; justify-content:space-between;` : ''}
  ${(props) => props.overflow ? `overflow-y:scroll;` : ''};
`;

export default Grid;