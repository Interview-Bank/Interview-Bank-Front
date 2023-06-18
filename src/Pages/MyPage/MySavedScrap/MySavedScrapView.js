import React from 'react'
import styled from "styled-components";

const MySavedScrapView = () => {
  return (
    <NoPost>작성한 답변글이 없습니다.</NoPost>
    )
  }
  const NoPost = styled.div`
    position: absolute;
    display: flex;
    width: 954px;
    height: 326px;
  
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
  
    justify-content: center;
    align-items: center;
    color: #ABABAB;
  
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 8px;
  `;

export default MySavedScrapView