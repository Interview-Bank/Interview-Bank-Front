import React from 'react'
import styled from "styled-components";


const ImageOptionsModal = ({ onUploadClick, onResetClick }) => {
  return (
    <ImageOptionsModalContainer>
        <ImageUploadBtn onClick={onUploadClick}>이미지 업로드</ImageUploadBtn>
        <ImageResetBtn onClick={onResetClick}>이미지 초기화</ImageResetBtn>
    </ImageOptionsModalContainer>
  )
};

const ImageOptionsModalContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 179px;
    height: 94px;

    left : 87%;
    top : 110%;

    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;

    z-index: 5;
`;

const ImageUploadBtn = styled.div`
    position: relative;
    display : flex;
    align-items: center;

    width: 177.89px;
    height: 46px;


    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    
    color: #000000;

    padding-left: 10px;

    cursor: pointer;

`;

const ImageResetBtn = styled.div`
    position: relative;
    display : flex;
    align-items: center;

    width: 177.89px;
    height: 46px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #000000;

    padding-left: 10px;

    cursor: pointer;


`;

export default ImageOptionsModal