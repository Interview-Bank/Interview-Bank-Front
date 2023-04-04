import axios from "axios";
import React, { useRef, useState } from "react";
import PostView from "./PostView";
import { useNavigate } from "react-router-dom";
import { setTokenHeaders } from "../../api/apiGetTokenHeader";
import { useDispatch } from "react-redux";

function PostContainer() {
	const inputId = useRef(0);
	const generateId = () => {
		inputId.current += 1;
		return inputId.current;
	};
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
		primaryJobCategory: "",
		secondaryJobCategory: "",
	});

	const isChangeSelectBoxItems = (name, value) => {
		setInputSelectBox((prev) => {
			return { ...prev, [name]: value };
		});
	};
	const dispatch = useDispatch();
	const headers = setTokenHeaders();
	const navigate = useNavigate();
	const postValidationCheck = () => {
		console.log(inputSelectBox);
		const {
			interviewPeriod,
			careerYear,
			primaryJobCategory,
			secondaryJobCategory,
		} = inputSelectBox;

		if (!title) {
			dispatch({
				type: "OPEN",
				payload: { title: "제목을 입력해주세요.", content: "" },
			});
			return false;
		}
		if (!inputs.content) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "질문이 비었어요!",
					content: "최소 한글자 이상 입력해주세요.",
				},
			});
			return false;
		}
		if (!primaryJobCategory) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "직종이 선택되지 않았어요!",
					content: "직종을 선택해주세요.",
				},
			});
			return false;
		}
		return true;
	};

	const handleClickSubmit = async () => {
		const updatedQuestions = inputs;
		const {
			interviewPeriod,
			careerYear,
			primaryJobCategory,
			secondaryJobCategory,
		} = inputSelectBox;

		const data = {
			interviewPeriod,
			careerYear,
			jobCategoryId: Number(primaryJobCategory),
			// primaryJobCategory,
			questionsRequest: {
				questions: updatedQuestions,
			},
			// secondaryJobCategory,
			title: title,
		};

		console.log(data);

		try {
			const response = await axios.post(
				"https://bstaging.interviewbank.net/interview",
				data,
				{
					headers,
				}
			);
			const newIntervieId = response.data.interviewId;
			navigate(`/interview/${newIntervieId}`);
		} catch (err) {
			if (data.title === "") {
				// setEmptyInterviewTitleModal(true)
			} else {
				data.questionsRequest.questions.map((content, id) => {
					if (content.content === "") {
						// setEmptyInterviewContentModal(true)
					}
				});
			}
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
