import React, {useState, useCallback} from 'react'
import InquiryView from "./InquiryView"

const InquiryContainer = () => {

  const InquiryTypeList = ["에러 문의하기", "서비스 개선 문의하기", "기타 문의하기"]

  const [selectedInquiryType, setSelectedInquiryType] = useState("");

  const handleSelectChange = (event) => {
    setSelectedInquiryType(event.target.value);
  };  //드롭다운 선택 
  const [userEmail, setUserEmail] = useState("")
  const [inquiryTitle, setInquiryTitle] = useState("")
  const [inquiryContents, setInquiryContents] = useState("")
  const [attachedFile, setAttachedFile] = useState(null)
  //파일 용량 검사 필요, 파일은 드래그 앤 드랍

  const [emailErrMsg, setEmailErrMsg] = useState("")

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setUserEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailErrMsg("이메일 형식이 올바르지 않습니다.");
    }
  }, []);

  const handleInputLimit = useCallback((maxLengthInBytes) => (e) => {
    const inputText = e.target.value;
    const byteCount = new Blob([inputText]).size;
  
    if (byteCount > maxLengthInBytes) {
      e.target.setCustomValidity(`글자 수가 ${maxLengthInBytes} 바이트를 초과하였습니다.`);
      e.target.reportValidity();
      e.target.value = inputText.slice(0, maxLengthInBytes);
    } else {
      e.target.setCustomValidity("");
    }

    if (e.target.id === 'email' && !validateEmail(inputText)) {
      setEmailErrMsg("이메일 형식이 올바르지 않습니다.");
    }
  }, []);

  const handleClidkSubmit = () => {
    console.log("submit")
  }

  return (
    <InquiryView
    InquiryTypeList = {InquiryTypeList}
      selectedInquiryType = {selectedInquiryType}
      setSelectedInquiryType = {setSelectedInquiryType}
      handleSelectChange = {handleSelectChange}
      userEmail = {userEmail}
      setUserEmail = {setUserEmail}

      inquiryTitle = {inquiryTitle}
      setInquiryTitle = {setInquiryTitle}

      inquiryContents = {inquiryContents}
      setInquiryContents = {setInquiryContents}

      attachedFile = {attachedFile}
      setAttachedFile = {setAttachedFile}

      emailErrMsg = {emailErrMsg}

      onChangeEmail = {onChangeEmail}

      handleInputLimit= {handleInputLimit}
      handleClidkSubmit = {handleClidkSubmit}/>
  )
}

export default InquiryContainer