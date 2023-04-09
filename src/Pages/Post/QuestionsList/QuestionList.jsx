import React from "react";
import styled from "styled-components";

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
								X
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
	:hover {
		color: red;
		cursor: pointer;
	}
`;

const InsertForm = styled.div`
	display: flex;
	position: relative;
`;

const Input = styled.input`
	width: 800px;
	height: 80px;
	border: none;
	background-color: #fff;
	font-weight: 700;
	color: #252525;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	border-radius: 8px;

	outline: none;
`;

const BlockWrapper = styled.div`
	justify-content: space-between;
	width: max-content;
`;
const Block = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 984px;
	height: 80px;
	margin-bottom: 15px;
	margin-top: 30px;
	border: none;
	border-left: 16px solid #2e55e7;
	background-color: #fff;
	font-weight: 700;
	color: #252525;
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	gap: 20px;
	border-radius: 8px;
	box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
	padding: 20px 50px;
	outline: none;
`;
export default QuestionList;
