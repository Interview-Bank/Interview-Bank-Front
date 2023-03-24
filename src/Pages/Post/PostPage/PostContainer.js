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
  const userName = localStorage.getItem("user");
  const [boardList, setBoardList] = useState([]);
  const [currentPost, setCurrentPost] = useState("")
  const fetchData = async () => {
    return new Promise(async (resolve, reject) => {
    try {
      let allData = [];
      let pageSize = 10;
      let pageNumber = 0;
      let data = [];
      do {
        console.log(pageNumber);
        const response = await axios.get(
          `https://bstaging.interviewbank.net/interview?page=${pageNumber}&size=${pageSize}`
        );
        data = response.data.interviews;
        allData = [...allData, ...data];
        setBoardList(allData);
        pageNumber++;
      } while (data.length === pageSize);
      setBoardList(allData);
      const newBoardList = allData.filter(
        (boardList) => boardList.nickname === userName
      );
      console.log(newBoardList[0].interviewId)
      resolve(); // 데이터가 성공적으로 설정된 후에 resolve()를 호출합니다.
    } catch (error) {
      console.log(error);
      reject(error); // 에러가 발생한 경우 reject()를 호출합니다.
    }
  })
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
      await axios.post("https://bstaging.interviewbank.net/interview", data, {
        headers,
      });
      await fetchData().then(() =>{
        console.log(currentPost)
        // URL을 변경하려면 다음 코드를 사용하세요.
        navigate(`/interview/${currentPost}`);
      });
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