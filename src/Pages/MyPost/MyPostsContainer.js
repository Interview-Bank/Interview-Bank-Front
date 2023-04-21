import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyPostsView from "./MyPostsView";
import { setTokenHeaders } from '../api/apiGetTokenHeader';

const MyPostsContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const token = useSelector((state) => state.Auth.token);
  const userName = localStorage.getItem("user");
  const newBoardList = boardList.filter(
    (boardList) => boardList.nickname === userName
  );
  const headers = setTokenHeaders();
  const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL


  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10;
        let pageNumber = 0;
        let data = [];
        do {
          console.log(pageNumber);
          const response = await axios.get(
            `${InterviewBaseUrl}?page=${pageNumber}&size=${pageSize}`,
            {headers}
          );
          data = response.data.interviews;
          allData = [...allData, ...data];
          setBoardList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setBoardList(allData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <MyPostsView boardList={newBoardList} />;
};

export default MyPostsContainer;
