import React from "react";
import QuestionList from "../QuestionsList/QuestionList";
import PopUpModal from "../../../Components/Modal/PopUpModal";
import EmptyInterviewTitleModalContainer from "../../../Components/ModalContent/EmptyInterviewTitleModal/EmptyInterviewTitleModalContainer";
import EmptyInterviewContentModalContainer from "../../../Components/ModalContent/EmptyInterviewContentModal/EmptyInterviewContentModalContainer";
import RegisterInterviewModalContainer from "../../../Components/ModalContent/RegisterInterviewModal/RegisterInterviewModalContainer";
import CommonModal from "../../../Components/ModalContent/CommonModal";

const PostBody = ({
	inputs,
	onRemove,
	onChange,
	onAddInput,
	modal,
	setModal,
	emptyInterviewTitleModal,
	setEmptyInterviewTitleModal,
	emptyInterviewContentModal,
	setEmptyInterviewContentModal,
	registerInterviewModal,
	setRegisterInterviewModal,
}) => {
	return (
		<div className="write__area">
			<QuestionList inputs={inputs} onRemove={onRemove} onChange={onChange} />
			<button className="btn__add" onClick={onAddInput}>
				+추가하기
			</button>
			{/* <AddButton onClick={onAddInput}>+추가하기</AddButton> */}
			{modal && (
				<CommonModal
					CloseModal={() => {
						setModal((prev) => !prev.modal);
					}}
				></CommonModal>
			)}
			{emptyInterviewTitleModal && (
				<PopUpModal
					CloseModal={() => {
						setEmptyInterviewTitleModal(!emptyInterviewTitleModal);
					}}
				>
					<EmptyInterviewTitleModalContainer />
				</PopUpModal>
			)}
			{emptyInterviewContentModal && (
				<PopUpModal
					CloseModal={() => {
						setEmptyInterviewContentModal(!emptyInterviewContentModal);
					}}
				>
					<EmptyInterviewContentModalContainer />
				</PopUpModal>
			)}
			{registerInterviewModal && (
				<PopUpModal
					CloseModal={() => {
						setRegisterInterviewModal(false);
						window.location.href = "/";
					}}
				>
					<RegisterInterviewModalContainer />
				</PopUpModal>
			)}
			<style jsx>{`
				.write__area {
					display: flex;
					width: 96%;
					max-width: 1100px;
					margin: 30px auto 0;
					align-items: center;
					justify-content: end;
					flex-wrap: wrap;
				}
				.btn__add {
					width: 100%;
					height: 100px;
					margin-top: 30px;
					margin-bottom: 18px;
					border: none;
					background-color: #fff;
					font-weight: 800;
					color: #747474;
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
		// <div>PostBody</div>
	);
};

export default PostBody;
