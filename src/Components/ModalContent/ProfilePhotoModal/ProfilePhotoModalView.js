import styled from "styled-components";

const ProfilePhotoModalView = ({ navigate, onClose, profilePhotoUrl }) => {
  return (
    <ProfilePhotoModalWrapper>
        <ProfilePhotoModalTitle>
            프로필 사진 선택하기
        </ProfilePhotoModalTitle>
        <Dividingline/>
        {profilePhotoUrl && (
            <ProfilePhoto src = {profilePhotoUrl}/>
        )}
        <MoveButton onClick={onClose}>완료</MoveButton>
    </ProfilePhotoModalWrapper>
  );
};
const ProfilePhotoModalWrapper = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;

    margin-top: 36px;
`
const ProfilePhotoModalTitle = styled.div`
    position: relative;
    width: 200px;
    height: 24px;   


    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    text-align: center;

    color: #252525;

    margin-bottom: 20px;
`
const Dividingline = styled.div`
    position: relative;
    width: 448px;
    height: 0px;

    border: 1px solid #D3D3D3;

    margin : 0 auto;
    margin-bottom: 22px;
`
const ProfilePhoto = styled.img`
    position: relative;
    width: 448px;
    height: 448px;

    margin : 0 auto;
    margin-bottom: 26px;

`
const MoveButton = styled.button`
    width: 80px;
    height: 35px;
    cursor: pointer;

    border: none;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;

    color: #FFFFFF;
    background-color: #2E55E7;

    z-index: 2;

    margin : 0 auto;

`



export default ProfilePhotoModalView;
