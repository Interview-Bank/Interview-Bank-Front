import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostView from "./PostView";

function PostContainer() {
  const [title, setTitle] = useState("");
  const [inputs, setInputs] = useState({
    content: "",
    questionsId: 0,
  });

  const { content, questionsId } = inputs;

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
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [questions, setQuestions] = useState([]);

  const data = {
    questionsRequest: {
      questions: questions,
    },
    title: title,
  };

  const nextId = useRef(1);

  const onCreate = () => {
    if (content.length < 1) {
      return;
    } else {
      const newQuestions = {
        content,
        questionsId,
      };
      setQuestions([...questions, newQuestions]);
      setInputs({
        content: "",
        questionsId: nextId.current,
      });
      nextId.current += 1;
      console.log(questions);
    }
  };

  const onRemove = (id) => {
    console.log(questions);
    setQuestions(questions.filter((question) => question.questionsId !== id));
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
      onRemove={onRemove}
    />
  );
}

export default PostContainer;
