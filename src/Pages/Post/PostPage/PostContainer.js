import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PostView from "./PostView";

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

  // const { content, questionsId } = inputs;
  const [emptyInterviewTitleModal, setEmptyInterviewTitleModal] = useState(false)
  const [emptyInterviewContentModal, setEmptyInterviewContentModal] = useState(false)

  // const [questions, setQuestions] = useState([]);

  const token = useSelector((state) => state.Auth.token);
  const headers = {
    "X-Auth-Token": token,
  };

  const handleClickSubmit = () => {

    const updatedQuestions = inputs;
    const data = {
      questionsRequest: {
        questions: updatedQuestions,
      },
      title: title,
    };
  
    axios
      .post("https://bstaging.interviewbank.net/interview", data, {
        headers,
      })
      .then((res) => {
        alert("글이 등록되었습니다.");
        window.location.href = "/";
      })
      .catch((err) => {
        if(data.title === ""){
          setEmptyInterviewTitleModal(true)
        }else{
          data.questionsRequest.questions.map((content, id) => {
            if(content.content === ""){
              setEmptyInterviewContentModal(true)
            }
          })
        }
      });
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
    />
  );
}

export default PostContainer;