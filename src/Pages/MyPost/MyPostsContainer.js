import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import MyPostsView from "./MyPostsView";
import { jwtUtils } from "../../utils/jwtUtils";

const MyPostsContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const token = useSelector((state) => state.Auth.token);
  const userName = localStorage.getItem("user");
  const newBoardList = boardList.filter(
    (boardList) => boardList.nickname === userName
  );
  const headers = {
    "X-Auth-Token": `${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10; // 한 번에 가져올 수 있는 최대 사이즈
        let pageNumber = 0;
        let data = [];
        do {
          console.log(pageNumber);
          const response = await axios.get(
            `https://bstaging.interviewbank.net/interview?page=${pageNumber}&size=${pageSize}`
          );
          console.log(response);
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
