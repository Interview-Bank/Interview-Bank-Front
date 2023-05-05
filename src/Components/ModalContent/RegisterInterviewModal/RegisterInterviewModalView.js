import styled from "styled-components";

const RegisterInterviewModalView = ({ onClose }) => {
  return (
    <ScrapModalWrapper>
        <DescriptionWrapper>
            <Description1>
                글이 등록되었습니다.
            </Description1>
        </DescriptionWrapper>
        <ButtonWarraper>
            <CloseButton onClick={onClose}>확인</CloseButton>
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
    color : #5C5C5C;
`
const ButtonWarraper = styled.div`
    width : 100%;
    height : auto;
`
const CloseButton = styled.button`
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



export default RegisterInterviewModalView;
