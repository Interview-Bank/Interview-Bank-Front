import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../../Layout/Banner/Banner'
import Layout from '../../Layout/Layout'
import PostComponent from '../../Layout/PostList/PostComponent'
import { bringHomeInterviewListData } from '../api/Home/homeFetchDataAPI'
import HomeSearch from './HomeSearch'

const HomePage = () => {
  const navigate = useNavigate();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    bringHomeInterviewListData()
      .then(result => setInterviewList(result))
      .catch(resolve => console.log(resolve));
  }, []);

  return (
    <Layout>
      <Banner />
      <HomeSearch />
      <div className="title">
        <h2>최신 글 보기</h2>
      </div>
      <div className="post__list">
        {interviewList
          && interviewList.map((current)=><PostComponent />)
        }
      </div>
      <style jsx>{`
        .title {
          margin: 0 auto;
          max-width: 1100px;
        }
        .post__list {
          display: grid;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;				
					grid-template-columns: repeat(4, 1fr);
					gap: 20px;
        }
      `}</style>
    </Layout>
  )
}

export default HomePage