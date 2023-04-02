import React from 'react'
import styled from "styled-components";

const MypageSidemenuView = ({onUserSettingClick, onMyPostsClick, onScrapClick}) => {
  return (
    <SidemenuContainer>
        <SidemenuTitle>
            내 정보 관리
        </SidemenuTitle>
        <SidemenuContensContainer>
            <SidemenuContentWrapper>
                <Sidemenu onClick={onUserSettingClick}>계정 관리</Sidemenu>
            </SidemenuContentWrapper>
            <SidemenuContentWrapper>
                <Sidemenu onClick={onMyPostsClick}>작성한 게시글</Sidemenu>
            </SidemenuContentWrapper>
            <SidemenuContentWrapper>
                <Sidemenu onClick={onScrapClick}>작성한 답변글</Sidemenu>
            </SidemenuContentWrapper>
        </SidemenuContensContainer>
    </SidemenuContainer>
  )
}
const SidemenuContainer = styled.div`

    box-sizing: border-box;

    position: relative;
    width: 270px;
    height: 230px;

    display : flex;
    flex-direction : column;

    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 20px;

    margin-right: 89px;
    padding-top: 25px;
    padding-left: 23px;
`;

const SidemenuTitle = styled.div`
    width: 120px;
    height: 24px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #737373;
`;

const SidemenuContensContainer = styled.div`
    display: flex;
    flex-direction : column;
    
    margin-top: 17px;
`;

const SidemenuContentWrapper = styled.div`
    position: relative;
    width: 240px;
    height: 45px;

    display: flex;
    align-items: center;

    background: #FFFFFF;
    border-radius: 3px;

    :hover {
    background: rgba(46, 85, 231, 0.1);
  }
`;

const Sidemenu = styled.div`
    position: absolute;
    display: flex;
    justify-content: left;
    width: 120px;
    height: 19px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;

    color: #252525;

    margin-left: 32px;

    cursor: pointer;
    :hover {
    color: #2e55e7;
  }
`;



export default MypageSidemenuView