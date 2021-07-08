import React from 'react';
import styled from 'styled-components';

import {Text} from '../elements';

const Input = (props) => {
  const {label, placeholder, border,value, multiline, _onChange, is_file, type, padding, width, height, margin} = props

  const styles = {
    padding:padding,
    width:width,
    margin:margin,
    height:height,
    border:border,
  }

  if(is_file) {
    return (
      <FileBox {...styles} type="file" onChange={_onChange} value={value}/>
    )
  }

  if(multiline) {
    return (
      <TextArea rows="10" {...styles} onChange={_onChange} value={value}/>
    )
  }

  return (
    <React.Fragment>
      <Text bold color="#60C1DF">{label}</Text>
      <InputBox {...styles} placeholder={placeholder} type={type} onChange={_onChange}/>
    </React.Fragment>
  );
}

Input.defaultProps = {
  type: "text",
  label: "",
  placeholder: "placeholder",
  padding: false,
  width: "100%",
  margin: false,
  is_file: false,
  multiline: false,
  value:'',
  _onChange: () => {}
}

const InputBox = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  border: 2px solid #C4C4C4;
  &:focus {
    outline: 1px solid #60C1DF;
  }
`; 

const FileBox = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  &:focus {
    outline: 1px solid #60C1DF;
  }
`; 

const TextArea = styled.textarea`
  width: 90%;
  height: 100%;
  resize: none;
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  &:focus {
    outline: 1px solid #60C1DF;
  }
`; 

export default Input;