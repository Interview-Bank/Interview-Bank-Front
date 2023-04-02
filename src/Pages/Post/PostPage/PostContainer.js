import axios from "axios";
import React, { useRef, useState } from "react";
import PostView from "./PostView";
import { useNavigate } from "react-router-dom";
import { setTokenHeaders } from '../../api/apiGetTokenHeader';

function PostContainer() {
  const [title, setTitle] = useState("");
  const inputId = useRef(0);

  const generateId = () => {
    inputId.current += 1;
    return inputId.current;
  };

  const [inputs, setInputs] = useState([{
    content: "",
    questionsId: inputId.current,
  }]);

  const [category, setCategory] = useState({
    primaryJobCategory: "",
    secondaryJobCategory: ""
  })

  const isChangeCategory = (name, value) => {
    setCategory(prev => { return { ...prev, [name]: value } })
    console.log(category)
  }  
  

  const [emptyInterviewTitleModal, setEmptyInterviewTitleModal] = useState(false)
  const [emptyInterviewContentModal, setEmptyInterviewContentModal] = useState(false)
  const [registerInterviewModal, setRegisterInterviewModal] = useState(false)

  const headers = setTokenHeaders();

  const navigate = useNavigate();

  const categoryValidationCheck = () => {
    const { primaryJobCategory, secondaryJobCategory } = category;
    if (!primaryJobCategory) {
      console.log("1차직종 값 없어요");
      return false;
    }
    if (!secondaryJobCategory) {
      console.log("2차직종 값 없어요");
      return false;
    }
    return true;
  };


  const handleClickSubmit = async () => {
    const updatedQuestions = inputs;
    const { primaryJobCategory, secondaryJobCategory } = category;

    console.log(category);
    // return false;
    
    const data = {
      primaryJobCategory,
      questionsRequest: {
        questions: updatedQuestions,
      },
      secondaryJobCategory,
      title: title,
    };

    try {
      const response = await axios.post("https://bstaging.interviewbank.net/interview", data, {
        headers,
      });
      const newIntervieId = response.data.interviewId;
      navigate(`/interview/${newIntervieId}`);
    } catch (err) {
        if(data.title === ""){
          setEmptyInterviewTitleModal(true)
        }else{
          data.questionsRequest.questions.map((content, id) => {
            if(content.content === ""){
              setEmptyInterviewContentModal(true)
            }
          });
        }
      };
  };
  const onChange = (questionsId, e) => {
    const newInputs = inputs.map((input) => {
      if (input.questionsId === questionsId) {
        return { ...input, content: e.target.value };
      }
      return input;
    });
    setInputs(newInputs);
  };
  const onAddInput = () => {
    const newInput = {
      content: "",
      questionsId: generateId()
    }
    setInputs([...inputs, newInput]);
  }

  const onRemove = (id) => {
    if(inputs.length > 1){
      const newInputs = inputs.filter((input) => input.questionsId !== id);
      setInputs(newInputs);
    }else{
      return
    }
  };

  return (
    <PostView
      setTitle={setTitle}
      onChange={onChange}
      onAddInput = {onAddInput}
      handleClickSubmit={handleClickSubmit}
      inputs={inputs}
      onRemove={onRemove}
      emptyInterviewTitleModal = {emptyInterviewTitleModal}
      setEmptyInterviewTitleModal = {setEmptyInterviewTitleModal}
      emptyInterviewContentModal = {emptyInterviewContentModal}
      setEmptyInterviewContentModal = {setEmptyInterviewContentModal}
      registerInterviewModal = {registerInterviewModal}
      setRegisterInterviewModal={setRegisterInterviewModal}
      category={category}
      isChangeCategory = {isChangeCategory}
    />
  );
}

export default PostContainer;