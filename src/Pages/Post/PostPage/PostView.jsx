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
	inputSelectBox,
	isChangeSelectBoxItems,
	postValidationCheck,
}) => {
	return (
		<Layout>
			<div className={inputs.length > 1 ?  'post__header sticky': 'post__header'}>
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
					z-index: 8;
					width: 100%;
					height: calc(100%);
					/* padding-top: 60px; */
					padding-bottom: 30px;
					background-color: #f9f9f9;
				}
				.sticky {
					border-bottom: 1px solid #ccc;
				}
			`}</style>
		</Layout>
	);
};

export default PostView;
