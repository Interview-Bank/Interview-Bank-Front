import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrapInterviewView from "./ScrapInterviewView";

const ScrapInterviewContainer = () => {
  const { scrap_id } = useParams();
  const [board, setBoard] = useState({});
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);

  const handleAddAnswer = () => {};

  const token = useSelector((state) => state.Auth.token);
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
