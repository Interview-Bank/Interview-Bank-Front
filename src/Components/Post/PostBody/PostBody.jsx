import React from "react";
import PostWrite from '../PostWrite/PostWrite';

const PostBody = ({ inputs, onRemove, onChange, onAddInput, handleInputLimit }) => {
	return (
		<div className="write__area">
			<PostWrite inputs={inputs} onRemove={onRemove} onChange={onChange} handleInputLimit={handleInputLimit} />
			<button className="btn__add" onClick={onAddInput}>
				+추가하기
			</button>
			<style jsx>{`
				.write__area {
					display: flex;
					width: 96%;
					max-width: 1276px;
					margin: 0 auto;
					align-items: center;
					justify-content: end;
					flex-wrap: wrap;
					margin-top: 30px;
				}
				.btn__add {
					width: 100%;
					height: 100px;
					// margin-top: 30px;
					margin-bottom: 18px;
					border: none;
					background-color: #fff;
					font-weight: 800;
					color: #2E55E7;
					font-size: 1.2rem;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 20px;
					border-radius: 8px;
					box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
					padding: 10px 10px;
					cursor: pointer;
					transition: box-shadow 0.3s ease-in-out;
					:hover {
						box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
						color: #2e55e7;
					}
				}
			`}</style>
		</div>
	);
};

export default PostBody;
