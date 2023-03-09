import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import MyPostsView from "./MyPostsView";
import { jwtUtils } from "../../utils/jwtUtils";

const MyPostsContainer = () => {
  const [boardList, setBoardList] = useState([]);
  const token = useSelector((state) => state.Auth.token);
  const authToken = jwtUtils.getId(token);
  const userName = localStorage.getItem("user");
  const newBoardList = boardList.filter(
    (boardList) => boardList.nickname === userName
  );
  const headers = {
    "X-Auth-Token": `${authToken}`,
  };

  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      const { data } = await axios.get(
        `https://bstaging.interviewbank.net/interview`,
        {},
        {
          headers,
        }
      );
      return data.interviews;
    };

    getBoardList().then((result) => {
      setBoardList(result);
    });
  }, []);

  return <MyPostsView boardList={newBoardList} />;
};

export default MyPostsContainer;
