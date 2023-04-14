import React, { useEffect, useState } from "react";
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

  const headers = setTokenHeaders();

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

  return (
    <ScrapInterviewView
      contents={contents}
      boardId={boardId}
      title={title}
      board={board}
    />
  );
};
export default ScrapInterviewContainer;
