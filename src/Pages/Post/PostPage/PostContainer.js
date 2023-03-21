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
    questionsId: generateId(),
  }]);

  const { content, questionsId } = inputs;
  const [emptyInterviewTitleModal, setEmptyInterviewTitleModal] = useState(false)

  const token = useSelector((state) => state.Auth.token);
  const headers = {
    "X-Auth-Token": token,
  };

  const handleClickSubmit = () => {
    console.log(token);
    axios
      .post("https://bstaging.interviewbank.net/interview", data, {
        headers,
      })
      .then((res) => {
        alert("글이 등록되었습니다.");
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err);
        if(data.title === ""){
          setEmptyInterviewTitleModal(true)
        }
        console.log(data)
        console.log(inputs)
        //여기서 제목 또는 내용이 비었을 때 팝업 생성을 해줘야함
        //비어있는 카드를 어떻게 체크할까?
        //이거 하려면 먼저 인터뷰 작성 방식을 수정해야한다.
      });
  };


  const [questions, setQuestions] = useState([]);

  const data = {
    questionsRequest: {
      questions: questions,
    },
    title: title,
  };

  const onCreate = (id, event) => {
    if ( event.target.value.length < 1) {
      return;
    } else {
      const newQuestions = {
        content : content,
        questionsId : id,
      };
      setQuestions([...questions, newQuestions]);
      setInputs([...inputs,
        {
        content: "",
        questionsId: generateId()
      }]);
   
      console.log(questions);
    }
  };
  const onChange = (questionsId, e) => {
    const newInputs = inputs.map((input) => {
      if (input.questionsId === questionsId) {
        return { ...input, content: e.target.value };
      }
      return input;
    });
    setInputs(newInputs);
    
    // const { name, value } = e.target;
    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });
  };
  const onAddInput = () => {
    //이건 단순히 인풋 카드를 하나 늘려주는거
    setInputs([...inputs,
      {
      content: "",
      questionsId: generateId()
    }]);
  }

  const onRemove = (id) => {
    // console.log(questions);
    // setQuestions(questions.filter((question) => question.questionsId !== id));
    const newInputs = inputs.filter((input) => input.questionsId !== id);

    setInputs(newInputs);

  };

  return (
    <PostView
      title={title}
      content={content}
      questionsId={questionsId}
      setTitle={setTitle}
      onChange={onChange}
      onCreate={onCreate}
      handleClickSubmit={handleClickSubmit}
      questions={questions}
      setQuestions={setQuestions}
      inputs={inputs}
      onRemove={onRemove}
      emptyInterviewTitleModal = {emptyInterviewTitleModal}
      setEmptyInterviewTitleModal = {setEmptyInterviewTitleModal}
      onAddInput = {onAddInput}
    />
  );
}

export default PostContainer;