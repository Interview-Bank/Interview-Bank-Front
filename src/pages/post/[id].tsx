
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { postInterview } from "../api/Post/postAPI";
import { useRouter } from 'next/router';
import { PostTitle } from '@/components/molecules/PostTitle';
import { PostSelect } from '@/components/atoms/PostSelect';
import { PostBody } from '@/components/molecules/PostBody';
import { setTokenHeaders } from '../api/login/loginCheck';
import { SeoHead } from '@/components/atoms/SeoHead';
import { modalSlice } from '@/redux/modalReducer';

const PostPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const inputId = useRef(0);
	const [title, setTitle] = useState("");
	const [inputs, setInputs] = useState([
		{
			content: "",
			questionsId: inputId.current,
		},
	]);

	const [headers, setHeaders] = useState();
	const [inputSelectBox, setInputSelectBox] = useState({
		interviewPeriod: "",
		careerYear: "",
		firstLevelId: "",
		secondLevelId: "",
	});

	useEffect(() => {
		// setHeaders(setTokenHeaders());
		// headers = setTokenHeaders();
	}, [])
	

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
			dispatch(modalSlice.actions.OPEN(
				{ title: "제목을 입력해주세요.", content: "" }
			));
			return false;
		}
		if (!interviewPeriod) {
			dispatch(modalSlice.actions.OPEN(
				{
					title: "면접 시기가 선택되지 않았어요!",
					content: "면접 시기를 선택해주세요.",
				}
			));
			return false;
		}
		if (!careerYear) {
			dispatch(modalSlice.actions.OPEN(
				{
					title: "경력이 선택되지 않았어요!",
					content: "경력을 선택해주세요.",
				}
			));
			return false;
		}
		if (!firstLevelId) {
			dispatch(modalSlice.actions.OPEN(
				{
					title: "직종이 선택되지 않았어요!",
					content: "직종을 선택해주세요.",
				}
			));
			return false;
		}
		if (inputs.length === 0) {
			dispatch(modalSlice.actions.OPEN(
				{
					title: "질문이 없어요!",
					content: "최소 하나의 질문은 적어주세요.",
				}
			));
			return false;
		}
		if (inputs.filter((current) => current.content === "").length) {
			dispatch(modalSlice.actions.OPEN(
				{
					title: "질문이 비었어요!",
					content: "최소 한글자 이상 입력해주세요.",
				}
			));
			return false;
		}
		return true;
	};

	const handleClickSubmit = async () => {
		if (postValidationCheck()) {
			setHeaders(setTokenHeaders());
			postInterview(headers, title, inputSelectBox, inputs)
				.then((response) => router.push(`/interview/${response.interviewId}`))
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
		e.target.style.height = "inherit";
		e.target.style.height = `${e.target.scrollHeight}px`;
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

	const handleInputLimit = (e) => {
    const maxLengthInBytes = 65535;
    const inputText = e.target.value;
    const byteCount = new Blob([inputText]).size;
  
    if (byteCount > maxLengthInBytes) {
      e.target.setCustomValidity("글자 수가 65,535 바이트를 초과하였습니다.");
      e.target.reportValidity();
      e.target.value = inputText.slice(0, maxLengthInBytes);
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
		<>
			<SeoHead title='글쓰기'/>
			<div
				className={inputs.length > 2 ? "post__header sticky" : "post__header"}
			>
				<PostTitle
					title={title}
					setTitle={setTitle}
					handleClickSubmit={handleClickSubmit}
					// postValidationCheck={postValidationCheck}
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
				handleInputLimit={handleInputLimit}
			/>
    <style jsx>{`
      .post__header {
        position: sticky;
        top: 81px;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding-bottom: 30px;
        background-color: #f9f9f9;
      }
      .sticky {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
      }
    `}</style>
    </>
	);
}

export default PostPage;
