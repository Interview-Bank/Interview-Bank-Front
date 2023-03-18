/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrapModalView from "./ScrapModalView";

const ScrapModalContainer = (props) => {
  const API_URL = "https://bstaging.interviewbank.net/";
  const navigate = useNavigate();
  const token = useSelector((state) => state.Auth.token);
  const [scrapList, setScrapList] = useState([]);


  const headers = {
    "X-Auth-Token": `${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10;
        let pageNumber = 0;
        let data = [];
        do {
          const response = await axios.get(
            `${API_URL}scraps?page=${pageNumber}&size=${pageSize}`,
            { headers }
          );
          data = response.data;
          allData = [...allData, ...data];
          setScrapList(allData);
          pageNumber++;
        } while (data.length === pageSize);
        setScrapList(allData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [scrapList]);

const onMove = () =>{
  navigate(`/scraps/${scrapList[0].scrapId}`);
};


  return <ScrapModalView navigate={navigate} onClose = {props.CloseModal} onMove = {onMove}/>;
};

export default ScrapModalContainer;
