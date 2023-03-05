import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
  const [interviewList, setInterviewList] = useState([]);
  const navigate = useNavigate();
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
          setInterviewList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setInterviewList(allData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <HomeView interviewList={interviewList} navigate={navigate} />;
};

export default HomeContainer;
