import React from "react";
import { useState } from "react";
import whiteLike from "../../Assets/Images/Icons/white_heart.png";
import blueLike from "../../Assets/Images/Icons/blue_heart.png";
import { useNavigate } from "react-router-dom";

const PostComponent = ({
	id,
	title,
	nickname,
	firstCategoryName,
	secondCategoryName,
	createdAt,
}) => {
	const navigate = useNavigate();
	// const [like, setLike] = useState(false);
	return (
		<div className="write__area" onClick={() => navigate(`/interview/${id}`)}>
			<div className="write__content">
				<div className="write__job">
					<span className="font-blue">{firstCategoryName}</span>
					<span className="font-blue">{secondCategoryName}</span>
				</div>
				<div className="write__title">
					<p>{title}</p>
				</div>
				<div className="write__create">
					<span>{nickname}</span>
					<span>{createdAt}</span>
				</div>
			</div>
			<div className="btn__write">지금 작성하기</div>
			{/* <div className="btn__like">
				{like ? (
					<img src={blueLike} alt="좋아요 아이콘" />
				) : (
					<img src={whiteLike} alt="좋아요 아이콘" />
				)}
			</div> */}
			<style jsx>{`
				.write__area {
					max-width: 304px;
					height: 177px;
					border: 1px solid #d9d9d9;
					border-radius: 8px;
					display: flex;
					flex-wrap: wrap;
					position: relative;
					cursor: pointer;
				}
				.write__area:hover {
					border: 1px solid #2e55e7;
				}
				.write__area:hover .btn__write {
					background-color: #2e55e7;
					color: white;
				}
				.write__content {
					width: calc(100% - 40px);
					height: calc(133px - 40px);
					padding: 20px;
				}
				.write__title > p {
					margin: 6px 0;
					font-size: 1rem;
					font-weight: 700;
					min-height: 41px;
				}
				.write__create > span {
					font-size: 14px;
					margin: 0 10px;
					position: relative;
				}
				.write__create > span::before {
					content: "";
					width: 1px;
					height: 1rem;
					background-color: #d9d9d9;
					position: absolute;
					top: 0;
					left: -10px;
					bottom: 0;
				}
				.write__create > span:first-child {
					margin-left: 0;
				}
				.write__create > span:first-child::before {
					display: none;
				}
				.btn__write {
					width: calc(100% - 40px);
					height: calc(44px - 20px);
					padding: 10px 20px;
					background-color: #ddd;
					border: 0;
					border-radius: 0 0 8px 8px;
					color: #aaa;
					font-weight: 700;
				}
				.btn__like {
					position: absolute;
					top: 12px;
					right: 12px;
				}
				.font-blue {
					color: #2e55e7;
					font-size: 11px;
					font-weight: 700;
					margin-right: 10px;
				}
			`}</style>
		</div>
	);
};

export default PostComponent;
