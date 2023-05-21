import React, { useState, useEffect } from "react";
import InterviewView from "./InterviewView";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setTokenHeaders } from '../api/apiGetTokenHeader';
import { checkCookieExistence } from "../api/loginApi";

const InterviewConatiner = () => {
  const { interview_id } = useParams();
  const [interview, setInterview] = useState({});
  const [contents, setContents] = useState([]);
  const [accountId, setAccountId] = useState(0);
  const [scrapModal, setScrapModal] = useState(false);
  const [LoginModal, setLoginModal] = useState(false);

  const isLogin = checkCookieExistence()

  const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL
  const ScrapBaseUrl = process.env.REACT_APP_API_SCRAP_BASE_URL

  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      const { data } = await axios.get(
        `${InterviewBaseUrl}/${interview_id}`
      );
      return data;
    };
    getBoard().then((result) => {
      setAccountId(result.accountId);
      setInterview(result);
      setContents(result.questions);
    });
  }, []);

  const handleScrap = async () => {
    const headers = setTokenHeaders();
    if(isLogin){
      try {
        const result = await axios.post(
          `${ScrapBaseUrl}`,
          {
            interviewId: interview.interviewId,
          },
          {
            headers,
          }
        );
        console.log(result);
        setScrapModal(true);
      } catch (err) {
        console.log(err);
      }
    }else{
      setLoginModal(true)
    }

  };

  const handleDelete = async () => {

    if (window.confirm("해당 글을 삭제하시겠습니까?")) {
      try {
        const headers = setTokenHeaders();
        await axios.delete(`${InterviewBaseUrl}/${interview_id}`, { headers });
        window.alert("삭제되었습니다.")
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleEdit = () => {
    navigate(`/post/${interview_id}`);
  }

  return (
    <InterviewView
      interview={interview}
      contents={contents}
      navigate={navigate}
      accountId={accountId}
      handleScrap={handleScrap}
      scrapModal = {scrapModal}
      setScrapModal = {setScrapModal}
      loginModal={LoginModal} 
      setLoginModal={setLoginModal} 
      handleDelete={handleDelete}
      handleEdit = {handleEdit}
    />
  );
};

export default InterviewConatiner;
