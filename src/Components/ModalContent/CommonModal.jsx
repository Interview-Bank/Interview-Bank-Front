import styled from "styled-components";

const CommonModal = ({ onClose }) => {
	return (
		<div className="modal__area">
			<ScrapModalWrapper>
				<DescriptionWrapper>
					<Description1>질문이 비었어요!</Description1>
					<Description2>최소 한글자 이상 입력해주세요.</Description2>
				</DescriptionWrapper>
				<ButtonWarraper>
					<CloseButton onClick={onClose}>확인</CloseButton>
				</ButtonWarraper>
			</ScrapModalWrapper>
			<style jsx>{`
				.modal__area {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
				}
			`}</style>
		</div>
	);
};
const ScrapModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const DescriptionWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const Description1 = styled.p`
	margin: 0;
	margin-bottom: 10px;
	font-family: "Inter", sans-serif;
	font-weight: bolder;
	font-size: 20px;
	color: #2e62e7;
`;
const Description2 = styled.p`
	margin: 0;
	font-size: 15px;
	font-family: "Inter", sans-serif;
	font-weight: bolder;
	color: #5c5c5c;
`;
const ButtonWarraper = styled.div`
	width: 100%;
	height: auto;
`;
const CloseButton = styled.button`
	width: 100px;
	height: 40px;
	cursor: pointer;
	background-color: #2e55e7;
	border: none;
	color: #fff;
	border-radius: 10px;
	margin-top: 20px;
	font-family: "Inter", sans-serif;
	font-weight: bolder;
	font-size: 20px;
	z-index: 2;
`;

export default CommonModal;
