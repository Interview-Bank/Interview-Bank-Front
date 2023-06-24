import React, {useState, useCallback} from 'react'
import InquiryView from "./InquiryView"
import {useDropzone} from 'react-dropzone'
import { useDispatch } from "react-redux";
import axios from "axios";



const InquiryContainer = () => {
  const InquiryUrl = process.env.REACT_APP_API_INQURIRY_BASE_URL
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
      setAttachedFile(acceptedFiles)
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const validateEmail = (email) => {
    console.log(email)
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  
  const onChangeEmail = useCallback(async (e) => {
    const curEmail = e.target.value;
    const EmailmaxLengthInBytes = 254;
    const byteCount = new Blob([curEmail]).size;

    setUserEmail(curEmail);
    if (byteCount > EmailmaxLengthInBytes) {
      e.target.setCustomValidity(`글자 수가 ${EmailmaxLengthInBytes} 바이트를 초과하였습니다.`);
      e.target.reportValidity();
      e.target.value = curEmail.slice(0, EmailmaxLengthInBytes);
    } else {
        if (!validateEmail(curEmail)) {
          setEmailErrMsg("이메일 형식이 올바르지 않습니다.");
        }else{
          setEmailErrMsg("");
        }
    }
  }, []);

  const onChangeTitle = useCallback(async (e) => {
    const curTitle = e.target.value;
    const TitlemaxLengthInBytes = 128;
    const byteCount = new Blob([curTitle]).size;

    if (byteCount > TitlemaxLengthInBytes) {
      e.target.setCustomValidity(`글자 수가 ${TitlemaxLengthInBytes} 바이트를 초과하였습니다.`);
      e.target.reportValidity();
      e.target.value = curTitle.slice(0, TitlemaxLengthInBytes);
      setInquiryTitle(e.target.value)
    } else {
        setInquiryTitle(curTitle)
    }
  }, []);  
  
  const onChangeContent = useCallback(async (e) => {
    const curContent = e.target.value;
    const ContentmaxLengthInBytes = 65535;
    const byteCount = new Blob([curContent]).size;

    if (byteCount > ContentmaxLengthInBytes) {
      e.target.setCustomValidity(`글자 수가 ${ContentmaxLengthInBytes} 바이트를 초과하였습니다.`);
      e.target.reportValidity();
      e.target.value = curContent.slice(0, ContentmaxLengthInBytes);
      setInquiryContents(e.target.value)
    } else {
      setInquiryContents(curContent)
    }
  }, []);

  const isEmailValid = validateEmail(userEmail)
  const SubmitValid = () => {
    if(selectedInquiryType === ""){
      dispatch({
				type: "OPEN",
				payload: { title: "문의 유형이 미선택되었습니다.", content: "문의 유형을 선택해주세요." },
			});
      return false
    }
    if(userEmail === ""){
      dispatch({
				type: "OPEN",
				payload: { title: "이메일 주소가 작성되지 않았습니다.", content: "답변받으실 이메일 주소를 입력해주세요." },
			});
      return false
    }
    console.log(inquiryTitle)
    if(inquiryTitle === ""){
      dispatch({
				type: "OPEN",
				payload: { title: "제목이 작성되지 않았습니다.", content: "문의하실 글의 제목을 입력해주세요." },
			});
      return false
    }
    if(inquiryContents === ""){
      dispatch({
				type: "OPEN",
				payload: { title: "내용이 작성되지 않았습니다.", content: "문의하실 글의 내용을 입력해주세요." },
			});
      return false
    }
      return true
  }

  const handleClidkSubmit = async () => {
    if(SubmitValid()){
      dispatch({
				type: "OPEN",
				payload: { title: "문의 내용이 접수되었습니다.", content: "담당자의 확인 후 기재하신 이메일로 회신드리겠습니다." },
			});

      const formData = new FormData();
      if (attachedFile){
        console.log(attachedFile)
        formData.append('file', attachedFile);
      }

      const inquiryRequest = {
        content: inquiryContents,
        email: userEmail,
        title: inquiryTitle,
      };

      formData.append('inquiryRequest', JSON.stringify(inquiryRequest));

      try {
        const response = await axios.post(`${InquiryUrl}`, 
        formData
        )
        console.log(response)
      } catch (error) {
        console.log(error);
      };

    }

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
      
      onChangeEmail = {onChangeEmail}
      onChangeTitle = {onChangeTitle}
      onChangeContent = {onChangeContent}
      getRootProps = {getRootProps}
      getInputProps = {getInputProps}
      isDragActive = {isDragActive}
      handleClidkSubmit = {handleClidkSubmit}
      />
  )
}

export default InquiryContainer