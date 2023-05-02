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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
          console.log(response)
>>>>>>> f835ee1 (fix/logout in Mypage, refactor/Environment variable setting but not working api in My ScrapContainer, so have to check it)
=======
          console.log(response)
>>>>>>> 6fc6ca5 (fix/logout in Mypage, refactor/Environment variable setting but not working api in My ScrapContainer, so have to check it)
=======
=======
          console.log(response)
>>>>>>> 309241773aa3b357fb0165204e1707a590a18c36
>>>>>>> 3e06b14be1a3145e638bfdb132e3ef3c7df6ad8d
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
  navigate(`/scraps/${scrapList[0].scrapId}`);
};


  return <ScrapModalView navigate={navigate} onClose = {props.CloseModal} onMove = {onMove}/>;
};

export default ScrapModalContainer;
