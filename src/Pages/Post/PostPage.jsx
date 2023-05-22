import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postInterview } from "../api/Post/postAPI";
import { updateInterview } from "../api/Post/updateInterviewAPI";
import Layout from "../../Layout/Layout";
import PostTitle from "../../Components/Post/PostTitle/PostTitle";
import PostSelect from "../../Components/Post/PostSelect/PostSelect";
import PostBody from "../../Components/Post/PostBody/PostBody";
import { getJobCategories, getFirstJobCategories, getSecondJobCategories } from "../api/Post/jobCategoryAPI";

function PostContainer() {
	const InterviewBaseUrl = process.env.REACT_APP_API_INTERVIEW_BASE_URL
	const { interview_id } = useParams();

	const [jobCategoriesArray, setJobCategoriesArray] = useState([]);

	
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

	useEffect(() => {
		if (interview_id){
			(async () => {
				try {
					const jobCategoriesArray = await getJobCategories();
					setJobCategoriesArray(jobCategoriesArray);

					const { data } = await axios.get(`${InterviewBaseUrl}/${interview_id}`);
					setTitle(data.title)
					const formattedQuestions = data.questions.map(question => ({
						content: question.content,
						questionsId: question.questionId,
					}));
					
					setInputs(formattedQuestions);
					let tempFirstLevelId = getFirstJobCategories(jobCategoriesArray).find(
						(current) => current.name === data.jobCategory.firstLevelName
					).id

					let tempSeconLevelId = getSecondJobCategories(jobCategoriesArray, tempFirstLevelId).find(
						(current) => current.name === data.jobCategory.secondLevelName
					).id
					setInputSelectBox(prevState => ({
						...prevState,
						interviewPeriod: data.interviewPeriod,
						careerYear : data.careerYear,
						firstLevelId : tempFirstLevelId,
						secondLevelId : tempSeconLevelId
					}));
					}catch (error){
						console.error(error);
					}
			})();
		}
	  }, [interview_id]);

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
		if (interview_id){
			if (postValidationCheck()) {
				updateInterview(title, inputSelectBox, inputs, interview_id)
					.then((response) => navigate(`/interview/${interview_id}`))
					.catch((reject) => console.log(reject));
			}
		}else{
			if (postValidationCheck()) {
				postInterview(title, inputSelectBox, inputs)
					.then((response) => navigate(`/interview/${response.interviewId}`))
					.catch((reject) => console.log(reject));
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
		e.target.style.height = "inherit";
		e.target.style.height = `${e.target.scrollHeight}px`;
		console.log(document.querySelector("write__area").height);
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
		<Layout>
			<div
				className={inputs.length > 2 ? "post__header sticky" : "post__header"}
			>
				<PostTitle
					title={title}
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
		</Layout>
	);
}

export default PostContainer;
