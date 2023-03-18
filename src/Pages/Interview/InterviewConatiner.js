import React, { useState, useEffect } from "react";
import InterviewView from "./InterviewView";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InterviewConatiner = () => {
  const { interview_id } = useParams();
  const [interview, setInterview] = useState({});
  const [contents, setContents] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [scrapModal, setScrapModal] = useState(false)
  const token = useSelector((state) => state.Auth.token);
  const userId = useSelector((state) => state.Auth.userId);

  const headers = {
    "X-Auth-Token": `${token}`,
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    const getBoard = async () => {
      const { data } = await axios.get(
        `https://bstaging.interviewbank.net/interview/${interview_id}`
      );
      return data;
    };
    getBoard().then((result) => {
      setAccountId(result.accountId);
      setInterview(result);
      setContents(result.questions);
    });
  }, []);

  const handleScrap = () => {
    axios
      .post(
        `https://bstaging.interviewbank.net/scraps`,
        {
          interviewId: interview.interviewId,
        },
        {
          headers,
        }
      )
      .then((result) => {})
      .catch((err) => console.log(err));
    setScrapModal(true)
  };

  return (
    <InterviewView
      interview={interview}
      contents={contents}
      navigate={navigate}
      token={token}
      userId={userId}
      accountId={accountId}
      handleScrap={handleScrap}
      scrapModal = {scrapModal}
      setScrapModal = {setScrapModal}
    />
  );
};

export default InterviewConatiner;
