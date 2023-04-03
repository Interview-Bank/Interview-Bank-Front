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
	category,
	isChangeCategory,
	postValidationCheck
}) => {
	return (
		<Layout>
			<div>
				<PostTitle
					setTitle={setTitle}
					handleClickSubmit={handleClickSubmit}
					postValidationCheck={postValidationCheck}
				/>
				<PostSelect category={category} isChangeCategory={isChangeCategory} />
			</div>
			<PostBody
				inputs={inputs}
				onRemove={onRemove}
				onChange={onChange}
				onAddInput={onAddInput}
			/>
		</Layout>
	);
};

export default PostView;
