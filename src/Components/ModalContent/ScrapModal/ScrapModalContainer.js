/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ScrapModalView from "./ScrapModalView";
import { setTokenHeaders } from '../../../Pages/api/apiGetTokenHeader';

const ScrapModalContainer = (props) => {
  const ScrapBaseUrl = process.env.REACT_APP_API_SCRAP_BASE_URL
  const navigate = useNavigate();
  const [scrapList, setScrapList] = useState([]);

  const headers = setTokenHeaders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let pageSize = 10;
        let pageNumber = 0;
        let data = [];
        do {
          const response = await axios.get(
            `${ScrapBaseUrl}?page=${pageNumber}&size=${pageSize}`,
            { headers }
          );
          data = response.data.scraps;
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
  }, []);

const onMove = () =>{
  console.log(scrapList)
  navigate(`/scraps/${scrapList[0].scrapId}`);
};


  return <ScrapModalView navigate={navigate} onClose = {props.CloseModal} onMove = {onMove}/>;
};

export default ScrapModalContainer;
