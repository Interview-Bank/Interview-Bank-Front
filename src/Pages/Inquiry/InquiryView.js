import React from 'react'
import styled from "styled-components";
import Layout from "../../Layout/Layout";
//2023-06-20 : 
// 이메일 errmsg랑 각 input이 없는 경우에 따른 modal 창(비정상 flow)
// 정상 flow - 문의하기 완료되었다는 modal창 띄우고 api 호출

const InquiryView = ({
  InquiryTypeList,
    selectedInquiryType,
    setSelectedInquiryType,
    handleSelectChange,
    userEmail,
    setUserEmail,
    inquiryTitle,
    setInquiryTitle,
    inquiryContents,
    setInquiryContents,
    attachedFile,
    setAttachedFile,
    isEmailValid,
    emailErrMsg,
    onChangeEmail,
    onChangeTitle,
    onChangeContent,
    getRootProps, 
    getInputProps, 
    isDragActive,
    handleClidkSubmit
  }) => {
  return (
    <>
      <Layout>
        <InquiryContainer>
          <InquiryWrapper>
            <InquiryTitle>
              문의하기
            </InquiryTitle>
            <InquiryContentWrapper>
              <ContentWrapper>
                <Title>문의유형을 선택하세요.</Title>
                <InquiryTypeWrapper>
                  <InquiryType 
                    value = {selectedInquiryType} 
                    onChange={handleSelectChange}>
                      <option value="" disabled hidden>카테고리</option>
                      {InquiryTypeList.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                  </InquiryType>
                </InquiryTypeWrapper>
              </ContentWrapper>
              <ContentWrapper>
                <Title>답변받으실 이메일을 입력해주세요.</Title>
                <EmailInput
                  id="email"
                  type="text"
                  placeholder="이메일 주소를 입력해주세요."
                  onChange={onChangeEmail}
                  autoComplete="off"/>
                <ErrMsg className={isEmailValid ? "success" : "error"}>
                  {emailErrMsg}
                </ErrMsg>
              </ContentWrapper>
              <ContentWrapper>
                <Title>제목을 입력해주세요.</Title>
                <TitleInput
                  id="title"
                  type="text"
                  placeholder="제목을 입력해주세요."
                  onChange={onChangeTitle}
                  autoComplete="off"/>
              </ContentWrapper>
              <ContentWrapper>
                <Title>내용을 입력해주세요.</Title>
                <ContentInputWrapper>
                  <ContentInput
                    id="content"
                    type="text"
                    placeholder="내용을 입력해주세요."
                    onChange={onChangeContent}
                    autoComplete="off"/>
                </ContentInputWrapper>
              </ContentWrapper>
              <ContentWrapper>
                <Title>첨부파일</Title>
                <AttachedFile 
                  isDragActive={isDragActive}
                 {...getRootProps()}>
                  <AttachedFileInput {...getInputProps()} />
                    <span className='blue'>첨부파일 추가</span>
                    &nbsp;
                    <span> 또는 여기로 드래그</span>
                </AttachedFile>
              </ContentWrapper>
            </InquiryContentWrapper>
            <SubmitBtn onClick={handleClidkSubmit}>문의하기</SubmitBtn>
            </InquiryWrapper>
        </InquiryContainer>
      </Layout>
    </>
  )
}
const InquiryContainer = styled.div`
  min-height: 100vh;
  width: 96%;
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
  margin-top : 60px;
`;

const InquiryWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 96%;
  
`

const InquiryTitle =styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  color: #000000;

`
const InquiryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  width: 100%;
  height:fit-content;

  margin-top: 36px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap : 12px;
  width: 100%;
  height:fit-content;

`;

const Title = styled.div`
  position: relative;
  width: fit-content;
  height:fit-content;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  text-align: center;

  color: #737373;
`;

const InquiryTypeWrapper = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 303px;
  height: 56px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  color: #929292;

  margin-top: 8px;
  padding-left: 20px;
  padding-right: 35px;
`;

const InquiryType = styled.select`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 100%;

  background: #FFFFFF;
  border: none;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;


  color: #929292;

  :focus {
  outline: none;
}
`;

const EmailInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 56px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  padding-left: 20px;

  ::placeholder{
    color: #9C9C9C;
  }
`;

const ErrMsg = styled.div`
  border: none;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  font-size: 12px;
  text-align: start;
  &.success {
    display: none;
  }
  &.error {
    color: red;

    display: block;
  }
`;

const TitleInput = styled.input`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 56px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  padding-left: 20px;

  ::placeholder{
    color: #9C9C9C;
  }
`;
const ContentInputWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 300px;

  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
`
const ContentInput = styled.textarea`
  box-sizing: border-box;

  border: none;
  outline: none;
  resize: none;
  overflow : auto;

  position: relative;
  width: 95%;
  height: 240px;


  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  margin : 30px 60px 30px 20px;

  ::placeholder{
    text-align: start;
    color: #9C9C9C;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background: #DDDDDD;
    border-radius: 20px;
    display: block;

  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: #2E55E7;
    border-radius: 20px;
  }
`;

const AttachedFile = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;

  width: 100%;
  height: 83px;

  background: #FFFFFF;
  border: 1px solid ${props => props.isDragActive ? '#2E55E7' : '#D9D9D9'};  border-radius: 8px;

  cursor: pointer;

  #active{
    border: 1px solid #2E55E7;
  }

  :hover{
    border: 1px solid #2E55E7;
  }

  & span{
    position: relative;
    width: fit-content;
    height: fit-content;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #737373;
  }
  & span.blue {
      color: #2E55E7;
    }
`;

const AttachedFileInput = styled.input`

`;

const SubmitBtn = styled.button`
  position: relative;
  width: 84px;
  height: 35px;
  background: #2E55E7;
  border : none;
  border-radius: 4px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;

  color: #FFFFFF;

  cursor: pointer;

  margin : 0 auto;
  margin-top: 60px;

`;
export default InquiryView