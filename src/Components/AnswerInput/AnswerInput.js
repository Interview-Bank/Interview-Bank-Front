import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getToken } from "../../Redux/Reducers/AuthReducer";
import styled from "styled-components";

function AnswerInput({ contents }) {
  const token = useSelector((state) => getToken(state));
  const headers = {
    "X-Auth-Token": `${token}`,
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // contents에서 question id를 추출하여 중복을 제거하고, 새로운 배열을 만듦
    const questionIds = [
      ...new Set(contents.map((answer) => answer.scrapQuestionId)),
    ];
    const newQuestions = questionIds.map((questionId) => ({
      scrapQuestionId: questionId,
      title: contents.find((answer) => answer.scrapQuestionId === questionId)
        .title,
      answers: contents.filter(
        (answer) => answer.scrapQuestionId === questionId
      ),
      rows: 1, // TextArea의 초기 rows 값
    }));
    setQuestions(newQuestions);
  }, [contents]);

  const handleAnswerChange = (event, questionIndex, answerIndex) => {
    const value = event.target.value;

    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === questionIndex
          ? {
              ...question,
              answers: question.answers.map((answer, j) =>
                j === answerIndex
                  ? {
                      ...answer,
                      scrapAnswerResponseList: [{ content: value }],
                    }
                  : answer
              ),
            }
          : question
      )
    );

    // TextArea의 rows 값을 동적으로 조정
    const textArea = event.target;
    textArea.rows = Math.ceil(textArea.scrollHeight / 22); // 한 줄의 높이는 22px로 설정
  };

  const handleSaveClick = () => {
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        const url = `https://bstaging.interviewbank.net/scraps/${answer.scrapId}/questions/${answer.scrapQuestionId}/answers/${answer.scrapAnswerId}`;

        const data = {
          content: answer.content,
        };

        axios
          .put(url, data, { headers })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
  };

  return (
    <div>
      <button onClick={handleSaveClick}>저장하기</button>
    </div>
  );
}

const TextArea = styled.textarea`
  padding: 0 18px;
  background-color: white;
  overflow: hidden;
  width: 1058px;
  height: 100px;
  outline: none;
  border: none;
`;

export default AnswerInput;
