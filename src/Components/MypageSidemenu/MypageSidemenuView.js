import React, {useState} from 'react'
import styled from "styled-components";
import UserSetting_ActiveUrl from "../../Assets/Icons/UserSetting_Active.png"
import UserSetting_UnActiveUrl from "../../Assets/Icons/UserSetting_UnActive.png"
import MyPost_ActiveUrl from "../../Assets/Icons/MyPost_Active.png"
import MyPost_UnActiveUrl from "../../Assets/Icons/MyPost_UnActive.png"
import MyScrap_ActiveUrl from "../../Assets/Icons/MyScrap_Active.png"
import MyScrap_UnActiveUrl from "../../Assets/Icons/MyScrap_UnActive.png"

const MypageSidemenuView = ({currentMenu, onUserSettingClick, onMyPostsClick, onScrapClick, onManagePostClick}) => {
    const [isUserSettingHovered, setIsUserSettingHovered] = useState(false);
    // const [isMyPostsHovered, setIsMyPostsHovered] = useState(false);
    // const [isMyScrapHovered, setIsMyScrapHovered] = useState(false);
    const [isManagePostHoverd, setIsManagePostHoverd] = useState(false);
  return (
    <SidemenuContainer>
        <SidemenuTitle>
            내 정보 관리
        </SidemenuTitle>
        <SidemenuContensContainer>
            <SidemenuContentWrapper
                backgroundColor = {currentMenu === "UserSetting" ? "rgba(46, 85, 231, 0.1)" : "transparent"} 
                onClick={onUserSettingClick}
                onMouseEnter={() => setIsUserSettingHovered(true)}
                onMouseLeave={() => setIsUserSettingHovered(false)}
            >
                <SidemenuIcon 
                    src={currentMenu === "UserSetting" ? UserSetting_ActiveUrl : isUserSettingHovered ? UserSetting_ActiveUrl: UserSetting_UnActiveUrl}/>
                <Sidemenu  
                    fontColor = {currentMenu === "UserSetting" ? "#2e55e7" : "#737373"} >
                        계정 관리
                </Sidemenu>
            </SidemenuContentWrapper>
            <SidemenuContentWrapper 
                backgroundColor = {currentMenu === "ManagePost" ? "rgba(46, 85, 231, 0.1)" : "transparent"} 
                onClick={onManagePostClick}
                onMouseEnter={() => setIsManagePostHoverd(true)}
                onMouseLeave={() => setIsManagePostHoverd(false)}
            >
                <SidemenuIcon 
                    src={currentMenu === "ManagePost" ? MyPost_ActiveUrl : isManagePostHoverd ? MyPost_ActiveUrl :MyPost_UnActiveUrl}/>
                <Sidemenu  
                    fontColor = {currentMenu === "ManagePost" ? "#2e55e7" : "#737373"} >
                        게시글 관리
                </Sidemenu>
            </SidemenuContentWrapper>
            {/* <SidemenuContentWrapper  
                backgroundColor = {currentMenu === "MyScrap" ? "rgba(46, 85, 231, 0.1)" : "transparent"} 
                onClick={onScrapClick}
                onMouseEnter={() => setIsMyScrapHovered(true)}
                onMouseLeave={() => setIsMyScrapHovered(false)}
            >
                <SidemenuIcon 
                    src={currentMenu === "MyScrap" ? MyScrap_ActiveUrl : isMyScrapHovered ? MyScrap_ActiveUrl : MyScrap_UnActiveUrl}/>
                <Sidemenu 
                    fontColor = {currentMenu === "MyScrap" ? "#2e55e7" : "#737373"}>
                        작성한 답변글
                </Sidemenu>
            </SidemenuContentWrapper> */}
        </SidemenuContensContainer>
    </SidemenuContainer>
  )
}
const SidemenuContainer = styled.div`

    box-sizing: border-box;

    position: relative;
    width: fit-content;
    height: fit-content;

    display : flex;
    flex-direction : column;

    margin-right: 58px;
`;

const SidemenuTitle = styled.div`
    position: relative;
    width: 190px;
    height: 46px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 46px;

    color: #252525;
`;

const SidemenuContensContainer = styled.div`
    display: flex;
    flex-direction : column;
    
    margin-top: 24px;

    & > div:not(:last-child) {
    margin-bottom: 4px;
  }
`;

const SidemenuContentWrapper = styled.div`
    position: relative;
    width: 268px;
    height: 46px;

    display: flex;
    align-items: center;

    flex-direction : row;

    background: ${props => props.backgroundColor};
    border-radius: 8px;
    
    padding-left: 12px;

    :hover {
        background: ${props => props.backgroundColor === "transparent" ? "rgba(46, 85, 231, 0.1)" : "rgba(46, 85, 231, 0.1)"};
  }
`;
const SidemenuIcon = styled.img`
    position: relative;
    width: 24px;
    height: 24px;

`;
const Sidemenu = styled.div`
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
    width: 250px;
    height: 46px;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: ${props => props.fontColor};
    margin-left: 12px;

    cursor: pointer;
    :hover {
    color: #2e55e7;
  }
`;



export default MypageSidemenuView