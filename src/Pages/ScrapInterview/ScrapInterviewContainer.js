import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrapInterviewView from "./ScrapInterviewView";
import styled from "styled-components";
import { getToken } from "../../Redux/Reducers/AuthReducer";

const ScrapInterviewContainer = () => {
  const { scrap_id } = useParams();
  const [board, setBoard] = useState({});
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [answerView, setAnswerView] = useState(false);

  const token = useSelector((state) => getToken(state));
  const headers = {
    "X-Auth-Token": `${token}`,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(
        `https://bstaging.interviewbank.net/scraps/${scrap_id}`,
        { headers }
      );
      console.log(data);
      setTitle(data.scrap.title);
      setBoardId(data.originalInterview.interviewId);

      return data;
    };
    getBoard().then((result) => {
      setBoard(result);

      setContents(
        result.scrapQuestionWithScrapAnswersList.map((item) => ({
          ...item,
          isOpen: false,
        }))
      );
    });
  }, []);

  return (
    <ScrapInterviewView
      contents={contents}
      boardId={boardId}
      title={title}
      board={board}
      navigate={navigate}
      answerView={answerView}
      setAnswerView={setAnswerView}
      setContents={setContents}
      scrap_id={scrap_id}
    />
  );
};
export default ScrapInterviewContainer;
