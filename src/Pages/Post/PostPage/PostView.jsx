import React from "react";
import Layout from "../../../Layout/Layout";
import PostTitle from "./PostTitle";
import PostSelect from "./PostSelect";
import PostBody from "./PostBody";

const PostView = ({
	setTitle,
	handleClickSubmit,
	onChange,
	onAddInput,
	inputs,
	onRemove,
	modal,
	setModal,
	emptyInterviewTitleModal,
	setEmptyInterviewTitleModal,
	emptyInterviewContentModal,
	setEmptyInterviewContentModal,
	registerInterviewModal,
	setRegisterInterviewModal,
	category,
	isChangeCategory,
}) => {
	return (
		<Layout>
			<PostTitle
				setTitle={setTitle}
				handleClickSubmit={handleClickSubmit}
			></PostTitle>
			<PostSelect category={category} isChangeCategory={isChangeCategory} />
			<PostBody
				inputs={inputs}
				onRemove={onRemove}
				onChange={onChange}
				onAddInput={onAddInput}
				modal={modal}
				setModal={setModal}
				emptyInterviewTitleModal={emptyInterviewTitleModal}
				setEmptyInterviewTitleModal={setEmptyInterviewTitleModal}
				emptyInterviewContentModal={emptyInterviewContentModal}
				setEmptyInterviewContentModal={setEmptyInterviewContentModal}
				registerInterviewModal={registerInterviewModal}
				setRegisterInterviewModal={setRegisterInterviewModal}
			/>
		</Layout>
	);
};

export default PostView;
