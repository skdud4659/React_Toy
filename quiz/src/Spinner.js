import React from "react";
import styled from "styled-components";
import img from "./img/main.jpg";

const Spinner = (props) => {

    return (
      <Outter>
        <img src={img} style={{ wieth: "250px", height: "250px" }} />
      </Outter>
    );
}

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ede2ff;
`;

export default Spinner;