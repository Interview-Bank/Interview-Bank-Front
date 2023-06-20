import React, {useState, useCallback} from 'react'
import InquiryView from "./InquiryView"
import {useDropzone} from 'react-dropzone'
import { useDispatch } from "react-redux";


const InquiryContainer = () => {
  const dispatch = useDispatch();


  const InquiryTypeList = ["에러 문의하기", "서비스 개선 문의하기", "기타 문의하기"]

  const [selectedInquiryType, setSelectedInquiryType] = useState("");

  const handleSelectChange = (event) => {
    setSelectedInquiryType(event.target.value);
  }; 
  const [userEmail, setUserEmail] = useState("")
  const [inquiryTitle, setInquiryTitle] = useState("")
  const [inquiryContents, setInquiryContents] = useState("")
  const [attachedFile, setAttachedFile] = useState([])

  const [emailErrMsg, setEmailErrMsg] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    const totalSize = acceptedFiles.reduce((total, file) => total + file.size, 0);
    const totalSizeMB = totalSize / (1024 * 1024);
  
    if (totalSizeMB > 5) {
      dispatch({
				type: "OPEN",
				payload: {
					title: "파일 크기가 5MB를 초과했습니다.",
					content: "파일을 다시 업로드 해주세요.",
				},
			});

    } else {
      console.log(acceptedFiles);
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

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
    }else{
      setEmailErrMsg("")
    }
  }, []);

  const isEmailValid = validateEmail(userEmail)

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

      isEmailValid = {isEmailValid}
      emailErrMsg = {emailErrMsg}
      
      handleInputLimit= {handleInputLimit}
      getRootProps = {getRootProps}
      getInputProps = {getInputProps}
      isDragActive = {isDragActive}
      handleClidkSubmit = {handleClidkSubmit}
      />
  )
}

export default InquiryContainer