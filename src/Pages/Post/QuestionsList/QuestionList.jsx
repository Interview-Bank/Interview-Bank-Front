import React from "react";
import styled from "styled-components";
import DeleteButton from "../../../Assets/Images/Icons/icon_x.png";

const QuestionList = ({ inputs, onRemove, onChange }) => {
	return (
		<QuestionsList>
			{inputs.map((input) => (
				<InsertForm key={input.questionsId}>
					<BlockWrapper>
						<Block>
							<Input
								name="content"
								type="text"
								onChange={(event) => onChange(input.questionsId, event)}
								value={input.content}
								placeholder="인터뷰를 입력해주세요."
								autoComplete="off"
							/>
							<RemoveButton onClick={() => onRemove(input.questionsId)}>
								<img src={DeleteButton} alt="삭제 버튼" />
							</RemoveButton>
						</Block>
					</BlockWrapper>
				</InsertForm>
			))}
		</QuestionsList>
	);
};

const QuestionsList = styled.div`
	display: flex;
	flex-direction: column;
`;

const RemoveButton = styled.button`
	border: none;
	background-color: #fff;
	color: #b5b5b5;
	font-size: 1.1rem;
	position: absolute;
	right: 32px;
	top: 32px;
	// :hover {
	// 	color: red;
	// 	cursor: pointer;
	// }
`;

const InsertForm = styled.div`
	display: flex;
	position: relative;
`;

const Input = styled.textarea`
	width: 800px;
	// min-height: calc(88px - 32 * 2px);
	// max-height: calc(133px - 32 * 2px);
	height: 100%;
	border: none;
	background-color: #fff;
	font-weight: 700;
	color: #252525;
	font-size: 1.2rem;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	gap: 20px;
	border-radius: 8px;
	margin: 0;
	padding: 0;
	outline: none;
	resize: none;
	font-family: 'Noto Sans KR';
`;

const BlockWrapper = styled.div`
	justify-content: space-between;
	width: max-content;
`;
const Block = styled.div`
	flex-direction: row;
	-webkit-box-pack: justify;
	justify-content: space-between;
	width: 984px;
	// height: calc(88px - 32 * 2px);
	// max-height: calc(133px - 32 * 2px);
	height: 100%;
	margin-bottom: 20px;
	border-top: none;
	border-right: none;
	border-bottom: none;
	border-image: initial;
	border-left: 16px solid rgb(46, 85, 231);
	background-color: rgb(255, 255, 255);
	font-weight: 700;
	color: rgb(37, 37, 37);
	font-size: 1.2rem;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	gap: 20px;
	border-radius: 8px;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px 0px;
	padding: 32px 50px;
	outline: none;
`;
export default QuestionList;
