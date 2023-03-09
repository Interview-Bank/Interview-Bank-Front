import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
// import { CardScrap } from "../Components/CardScrap";
import { jwtUtils } from "../../utils/jwtUtils";
import { useSelector } from "react-redux";
import MyScrapView from "./MyScrapView"

const MyScrapContainer = () => {
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [boardList, setBoardList] = useState([]);
  const [scrapList, setScrapList] = useState([]);
  const token = useSelector((state) => state.Auth.token);
  const userName = localStorage.getItem("user");

  const headers = {
    "X-Auth-Token": `${token}`,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSkip((page - 1) * limit);
    const body = {
      skip: (page - 1) * limit,
      limit: limit,
    };
    setCurrentPage(page);
  };

  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기

    const getScrapList = async () => {
      const { data } = await axios.get(
        `https://bstaging.interviewbank.net/scraps`,
        {
          headers,
        }
      );
      return data;
    };

    getScrapList().then((result) => {
      setScrapList(result);
    });
  }, []);

  return(
    <MyScrapView
        scrapList={scrapList}
        handlePageChange={handlePageChange}
        limit={limit}
        currentPage={currentPage}
    />
  );
};

export default MyScrapContainer;