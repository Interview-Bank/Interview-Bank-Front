import React from "react";

const PostTitle = ({ setTitle, handleClickSubmit }) => {
	return (
		<div className="post__title">
			<input
				type="text"
				name="title"
				id="title"
				placeholder="제목을 입력하세요"
				maxLength={128}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<div className="btn__area">
				{/* <button className="btn-white" onClick={postValidationCheck}>임시저장</button> */}
				<button className="btn-blue" onClick={handleClickSubmit}>
					발행하기
				</button>
			</div>
			<style jsx>{`
				.post__title {
					// margin: 60px auto 0;
					// padding: 0 10px 0 20;
					max-width: 1276px;
					padding-top: 60px;
					margin: 0 auto;
					width: calc(100% - 30px);
					display: flex;
				}
				input {
					border: 0;
					height: 41px;
					width: calc(65% - 12px - 20px);
					padding: 0 10px;
					font-size: 28px;
					font-weight: 700;
					background-color: #f9f9f9;
					color: #252525;

					::placeholder {
						font-size: 28px;
						color: #747474;
					}
					:focus {
						outline: none;
					}
				}
				.btn__area {
					display: flex;
					width: calc(35% + 12px);
					font-size: 20px;
					font-weight: 500;
					flex-direction: row-reverse;
				}
				.btn-white {
					border-radius: 8px;
					height: 48px;
					width: 50%;
					margin-right: 12px;
					cursor: pointer;
					color: #5c5c5c;
					background-color: white;
					border: 1px solid #5c5c5c;
				}
				.btn-blue {
					border-radius: 4px;
					width: 50%;
					max-width: 84px;
					height: 35px;
					cursor: pointer;
					border: 0;
					background-color: #2e55e7;
					color: white;
				}
			`}</style>
		</div>
	);
};

export default PostTitle;
