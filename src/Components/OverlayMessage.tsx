import { get, toLower, trim } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverlayProps } from "../interfaces";
import { getTextFromHTML } from "../utils/parser";

const OverlayMessage: React.FC<OverlayProps> = ({
  onClose,
  question,
  input,
}) => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  useEffect(() => {
    if (input.current) {
      const val = toLower(trim(input.current.value)).replace(/\s\s+/g, " ");
      const isAnswerCorrect =
        val === toLower(getTextFromHTML(get(question, "answer", "")));
      setIsCorrectAnswer(isAnswerCorrect);
    }
  }, [question, input]);

  return (
    <StyledContainer id="popup">
      <StyledPopUp>
        <h2>Result</h2>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="content" id="message">
          {isCorrectAnswer ? (
            <StyledCorrectAnswer>
              Correct answer, you are on fire
            </StyledCorrectAnswer>
          ) : (
            <StyledWrongAnswer>Oops, Wrong answer</StyledWrongAnswer>
          )}
        </div>
        <StyledNext onClick={onClose}>Next</StyledNext>
      </StyledPopUp>
    </StyledContainer>
  );
};

export default OverlayMessage;

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  opacity: 1;
`;

const StyledPopUp = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 500px;
  padding: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 5s ease-in-out;

  h2 {
    margin-top: 0;
    color: #333;
    font-family: Tahoma, Arial, sans-serif;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 30px;
    transition: all 200ms;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }
  .close:hover {
    color: #06d85f;
  }
  .content {
    max-height: 30%;
    overflow: auto;
  }
`;

const StyledNext = styled.button`
  margin: 10px 0 10px auto;
  width: 100px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: black;
  color: white;
  float: right;
  cursor: pointer;
`;

const StyledCorrectAnswer = styled.span`
  color: green;
  font-weight: 600;
`;

const StyledWrongAnswer = styled.span`
  color: red;
  font-weight: 600;
`;
