import React, { useRef, useState } from "react";
import PostView from "./PostView";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postInterview } from '../../api/Post/postAPI';

function PostContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const inputId = useRef(0);  // useRef로 제일 최근 글 받아와서 그 id 값 넣을 필요있음
  const [title, setTitle] = useState("");
	const [inputs, setInputs] = useState([
		{
			content: "",
			questionsId: inputId.current,
		},
	]);
	const [inputSelectBox, setInputSelectBox] = useState({
		interviewPeriod: "",
		careerYear: "",
		firstLevelId: "",
		secondLevelId: "",
	});

	const generateId = () => {
		return inputId.current++;
	};
  
  const isChangeSelectBoxItems = (name, value) => {
    if (name === "firstLevelId" && inputSelectBox.secondLevelId !== "") {
      setInputSelectBox((prev) => {
        return { ...prev, [name]: value, secondLevelId: "" };
      });
    } else {
      setInputSelectBox((prev) => {
        return { ...prev, [name]: value };
      });
    }
	};
	const postValidationCheck = () => {
		const { interviewPeriod, careerYear, firstLevelId } = inputSelectBox;

		if (!title) {
			dispatch({
				type: "OPEN",
				payload: { title: "제목을 입력해주세요.", content: "" },
			});
			return false;
		}
    if (!interviewPeriod) {
      dispatch({
				type: "OPEN",
				payload: {
					title: "면접 시기가 선택되지 않았어요!",
					content: "면접 시기를 선택해주세요.",
				},
			});
			return false;
    }
    if (!careerYear) {
      dispatch({
				type: "OPEN",
				payload: {
					title: "경력이 선택되지 않았어요!",
					content: "경력을 선택해주세요.",
				},
			});
			return false;
    }
		if (!firstLevelId) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "직종이 선택되지 않았어요!",
					content: "직종을 선택해주세요.",
				},
			});
			return false;
    }
    if (inputs.filter((current)=>current.content === "").length) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "질문이 비었어요!",
					content: "최소 한글자 이상 입력해주세요.",
				},
			});
			return false;
    }
		return true;
	};

  const handleClickSubmit = async () => {
    if (postValidationCheck()) {
      postInterview(title, inputSelectBox, inputs)
        .then(response => navigate(`/interview/${response.interviewId}`))
        .catch(reject => console.log(reject));
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
	};
	const onAddInput = () => {
		const newInput = {
			content: "",
			questionsId: generateId(),
		};
		setInputs([...inputs, newInput]);
	};

	const onRemove = (id) => {
		if (inputs.length > 1) {
			const newInputs = inputs.filter((input) => input.questionsId !== id);
			setInputs(newInputs);
		} else {
			return;
		}
	};

	return (
		<PostView
			setTitle={setTitle}
			onChange={onChange}
			onAddInput={onAddInput}
			handleClickSubmit={handleClickSubmit}
			inputs={inputs}
			onRemove={onRemove}
			inputSelectBox={inputSelectBox}
			isChangeSelectBoxItems={isChangeSelectBoxItems}
			postValidationCheck={postValidationCheck}
		/>
	);
}

export default PostContainer;
