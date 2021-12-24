import React from "react";
import styled from "styled-components";
import Questions from "./Questions";

const Home: React.FC = () => {
  return (
    <StyledWrapper>
      <Questions />
    </StyledWrapper>
  );
};

export default Home;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0);

  &::before {
    background-position: 50% center;
    background-size: 100vh;
    background-image: url(../background.jpg);
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    display: block;
    z-index: 0;
    content: "";
    opacity: 0.2;
    pointer-events: none;
  }
`;
