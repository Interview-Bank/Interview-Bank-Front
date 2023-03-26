import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PostView from "./PostView";
import { useNavigate } from "react-router-dom";

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

  const [emptyInterviewTitleModal, setEmptyInterviewTitleModal] = useState(false)
  const [emptyInterviewContentModal, setEmptyInterviewContentModal] = useState(false)
  const [registerInterviewModal, setRegisterInterviewModal] = useState(false)

  const token = useSelector((state) => state.Auth.token);
  const headers = {
    "X-Auth-Token": token,
  };

  const navigate = useNavigate();

  const handleClickSubmit = async () => {
    const updatedQuestions = inputs;
    const data = {
      questionsRequest: {
        questions: updatedQuestions,
      },
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
      setRegisterInterviewModal = {setRegisterInterviewModal}
    />
  );
}

export default PostContainer;