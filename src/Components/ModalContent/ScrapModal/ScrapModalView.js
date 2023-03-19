import styled from "styled-components";

const ScrapModalView = ({ navigate, onClose, onMove }) => {
  return (
    <ScrapModalWrapper>
        <DescriptionWrapper>
            <Description1>
                스크랩 되었습니다.
            </Description1>
            <Description2>
                페이지로 이동할까요?
            </Description2>
        </DescriptionWrapper>
        <ButtonWarraper>
            <CloseButton onClick={onClose}>취소</CloseButton>
            <MoveButton onClick={onMove}>이동</MoveButton>
        </ButtonWarraper>
    </ScrapModalWrapper>
  );
};
const ScrapModalWrapper = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content : space-evenly;
`
const DescriptionWrapper = styled.div`
    width : 100%;
    display : flex;
    flex-direction : column;
`
const Description1 = styled.p`
    margin : 0;
    margin-bottom : 10px;
    font-family: "Inter", sans-serif;
    font-weight: bolder;
    font-size: 20px;
    color : #2E62E7;
`
const Description2 = styled.p`
    margin : 0;
    font-size: 15px;
    font-family: "Inter", sans-serif;
    font-weight: bolder;
    color : #5C5C5C;

`
const ButtonWarraper = styled.div`
    width : 100%;
    height : auto;
    display : flex;
    flex-direction : row;
    justify-content : space-around;

`
const CloseButton = styled.button`
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: #929292;
    border: none;
    color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    font-family: "Inter", sans-serif;
    font-weight: bolder;
    font-size: 20px;
    z-index: 2;
`
const MoveButton = styled.button`
    width: 100px;
    height: 40px;
    cursor: pointer;
    background-color: #2E55E7;
    border: none;
    color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    font-family: "Inter", sans-serif;
    font-weight: bolder;
    font-size: 20px;
    z-index: 2;
`



export default ScrapModalView;
