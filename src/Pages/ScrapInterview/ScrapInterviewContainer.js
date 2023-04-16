import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ScrapInterviewView from "./ScrapInterviewView";
import { setTokenHeaders } from '../api/apiGetTokenHeader';

const ScrapInterviewContainer = () => {
  const { scrap_id } = useParams();
  const [board, setBoard] = useState({});
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();
  const headers = setTokenHeaders();

  const [answers, setAnswers] = useState({});
  const [inputValues, setInputValues] = useState({});

  const toggleAnswerInput = (index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: !prevAnswers[index],
    }));
  };

  const handleInputChange = (index, e) => {
    setInputValues({ ...inputValues, [index]: e.target.value });
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    };

  const handleWrapperClick = (e) => {
    e.stopPropagation();
  };

  const handleInputLimit = (e) => {
    const maxLengthInBytes = 65535;
    const inputText = e.target.value;
    const byteCount = new Blob([inputText]).size;
  
    if (byteCount > maxLengthInBytes) {
      e.target.setCustomValidity("글자 수가 65,535 바이트를 초과하였습니다.");
      e.target.reportValidity();
      e.target.value = inputText.slice(0, maxLengthInBytes);
    } else {
      e.target.setCustomValidity("");
    }
  };

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current.forEach((inputRef, index) => {
      if (answers[index]) {
        inputRef.style.height = "auto";
        inputRef.style.height = inputRef.scrollHeight + "px";
      }
    });
  }, [answers]);

  useEffect(() => {
    setInputValues(
      contents.map((item) =>
        item.scrapAnswerResponseList[0].content === null
          ? ""
          : item.scrapAnswerResponseList[0].content
      )
    );
  }, [contents]);

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(
        `https://bstaging.interviewbank.net/scraps/${scrap_id}`,
        {headers}
      );
      setTitle(data.scrap.title);
      setBoardId(data.originalInterview.interviewId);
      console.log(data);
      return data;
    };
    getBoard().then((result) => {
      setBoard(result);
      setContents(result.scrapQuestionWithScrapAnswersList);
    });
  }, []);

  const handleScrapAnswer = async () => {
    console.log(contents)
    try {
      const responses = await Promise.all(
        contents.map(async (item, index) => {

          let updatecontent = inputValues[index] === undefined
          ? (item.scrapAnswerResponseList[0].content === null ? "" : item.scrapAnswerResponseList[0].content)
          : inputValues[index];

          const url = `https://bstaging.interviewbank.net/scraps/${scrap_id}/questions/${item.scrapQuestionId}/answers/${item.scrapAnswerResponseList[0].scrapAnswerId}`;
          const response = await axios.put(url, { content : updatecontent }, {headers});

          if (response.status !== 200) {
            throw new Error(`Failed to update item ${index}, status code: ${response.status}, status text: ${response.statusText}`);
          }
          return response;
        }),
    );
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
  };

  return (
    <ScrapInterviewView
      contents={contents}
      boardId={boardId}
      title={title}
      board={board}
      navigate={navigate}
      answers = {answers}
      setAnswers = {setAnswers}
      inputValues = {inputValues}
      toggleAnswerInput = {toggleAnswerInput}
      handleInputChange = {handleInputChange}
      handleWrapperClick = {handleWrapperClick}
      handleInputLimit = {handleInputLimit}
      handleScrapAnswer = {handleScrapAnswer}
      inputRefs = {inputRefs}
    />
  );
};
export default ScrapInterviewContainer;
