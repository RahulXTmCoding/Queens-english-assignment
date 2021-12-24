import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getQuestion } from "../services/question";
import get from "lodash/get";
import first from "lodash/first";
import Overlay from "./OverlayMessage";
import { QuestionProps } from "../interfaces";

const Questions: React.FC = () => {
  const [question, setQuestion] = useState<QuestionProps>();
  const [visible, setVisible] = useState<boolean>(false);
  const input = useRef<HTMLInputElement>(null);

  const getQuestionData = async () => {
    await getQuestion().then((response) => {
      const resQuestion = first(response);
      setQuestion({
        question: get(resQuestion, "question", ""),
        answer: get(resQuestion, "answer", ""),
      });
    });
  };

  useEffect(() => {
    getQuestionData();

    // eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    if (!input || !input.current || !input.current.value) {
      alert("Please Enter your answer");
      return;
    }

    setVisible(true);
  };

  const handleClose = async () => {
    setVisible(false);
    await getQuestionData();
    if (input.current) {
      input.current.value = "";
    }
  };

  return (
    <StyledQuetionContainer>
      <StyledQuestion>{get(question, "question", "")}</StyledQuestion>
      <StyledInput
        id="answer_input"
        placeholder="Enter your answer here"
        type="text"
        ref={input}
      />
      <StyledButton type="button" onClick={handleSubmit}>
        Submit
      </StyledButton>
      {visible ? (
        <Overlay onClose={handleClose} question={question} input={input} />
      ) : null}
    </StyledQuetionContainer>
  );
};

export default Questions;

const StyledQuetionContainer = styled.div`
  width: 600px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  padding: 30px;
  border-radius: 30px;
`;

const StyledQuestion = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const StyledInput = styled.input`
  height: 40px;
  border-radius: 50px;
  width: calc(100% - 40px);
  padding: 5px 20px;
  margin: 10px 0px;
`;

const StyledButton = styled.button`
  margin: 10px 0 10px auto;
  width: 100px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: black;
  color: white;
  float: right;
  cursor: pointer;
`;
