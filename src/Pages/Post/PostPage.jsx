import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postInterview } from "../api/Post/postAPI";
import Layout from "../../Layout/Layout";
import PostTitle from "../../Components/Post/PostTitle/PostTitle";
import PostSelect from "../../Components/Post/PostSelect/PostSelect";
import PostBody from "../../Components/Post/PostBody/PostBody";

function PostContainer() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const inputId = useRef(0);
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
		if (inputs.length === 0) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "질문이 없어요!",
					content: "최소 하나의 질문은 적어주세요.",
				},
			});
			return false;
		}
		if (inputs.filter((current) => current.content === "").length) {
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
				.then((response) => navigate(`/interview/${response.interviewId}`))
				.catch((reject) => console.log(reject));
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

	const checkGenerateQuestionCountOver = () => {
		if (inputs.length >= 1000) {
			dispatch({
				type: "OPEN",
				payload: {
					title: "질문이 너무 많아요!",
					content: "1000개 이상은 생성 불가능합니다.",
				},
			});
			return false;
		}
		return true;
	};

	const onAddInput = () => {
		if (checkGenerateQuestionCountOver()) {
			generateId();
			const newInput = {
				content: "",
				questionsId: inputId.current,
			};
			setInputs([...inputs, newInput]);
		}
	};

	const onRemove = (id) => {
		const newInputs = inputs.filter((input) => input.questionsId !== id);
		setInputs(newInputs);
		// if (inputs.length > 0) {
		// } else {
		// 	return;
		// }
	};

	return (
		<Layout>
			<div
				className={inputs.length > 1 ? "post__header sticky" : "post__header"}
			>
				<PostTitle
					setTitle={setTitle}
					handleClickSubmit={handleClickSubmit}
					postValidationCheck={postValidationCheck}
				/>
				<PostSelect
					inputSelectBox={inputSelectBox}
					isChangeSelectBoxItems={isChangeSelectBoxItems}
				/>
			</div>
			<PostBody
				inputs={inputs}
				onRemove={onRemove}
				onChange={onChange}
				onAddInput={onAddInput}
			/>
			<style jsx>{`
				.post__header {
					position: sticky;
					top: 101px;
					z-index: 2;
					width: 100%;
					height: calc(100%);
					padding-bottom: 30px;
					background-color: #f9f9f9;
				}
				.sticky {
					box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
				}
			`}</style>
			{/* <PostView
				setTitle={setTitle}
				onChange={onChange}
				onAddInput={onAddInput}
				handleClickSubmit={handleClickSubmit}
				inputs={inputs}
				onRemove={onRemove}
				inputSelectBox={inputSelectBox}
				isChangeSelectBoxItems={isChangeSelectBoxItems}
				postValidationCheck={postValidationCheck}
			/> */}
		</Layout>
	);
}

export default PostContainer;
