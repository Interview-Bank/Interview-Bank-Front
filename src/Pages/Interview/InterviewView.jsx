import { jwtUtils } from "../../utils/jwtUtils";
import styled from "styled-components";
import Layout from "../../Layout/Layout";
import ScrapModal from "../../Components/Modal/CheckPopUpModal";
import ScrapModalContainer from "../../Components/ModalContent/ScrapModal/ScrapModalContainer";
import { setTokenHeaders } from "../api/apiGetTokenHeader";
import { getCookieValue } from '../api/loginApi';
import ScrapIconUrl from "../../Assets/Icons/scrapIcon.png"
import Modal from "../../Components/Modal/LoginModal";
import LoginContainer from "../Login/LoginContainer";

const InterviewView = ({
	interview,
	contents,
	accountId,
	handleScrap,
	scrapModal,
	setScrapModal,
	loginModal,
	setLoginModal
}) => {
	const token = setTokenHeaders()["X-Auth-Token"];
	const userId = Number(getCookieValue("userId"));
	return (
		<Layout>
			<BoardWrapper>
				<div className="board-body">
          <BoardTitleWrapper>
            <BoardTitle>{interview.title}</BoardTitle>
            <BoardScrapButtonWrapper  onClick={handleScrap}>
              <ScrapIcon src = {ScrapIconUrl}/>
              <BoardScrapButton>
                답변 작성하기
              </BoardScrapButton>
            </BoardScrapButtonWrapper>
          </BoardTitleWrapper>
					<BoardDetail>
						<BoardDate>
							{interview.createdAt !== undefined &&
								interview.createdAt.slice(0, 10)}
						</BoardDate>
						{token && accountId === userId && (
							<div>
								<BoardDelete>삭제하기</BoardDelete>
								<BoardEdit>수정하기</BoardEdit>
							</div>
						)}
						{scrapModal && (
							<ScrapModal
								CloseModal={() => {
									setScrapModal(!scrapModal);
								}}
							>
								<ScrapModalContainer />
							</ScrapModal>
						)}
						{loginModal && (
							<Modal
								CloseModal={() => {
								setLoginModal(!loginModal);
								}}
							>
								<LoginContainer />
							</Modal>
							)}
					</BoardDetail>
					<QuestionsBlock>
						{contents.map((item, index) => (
							<li key={index}>{item.content}</li>
						))}
					</QuestionsBlock>
				</div>
			</BoardWrapper>
		</Layout>
	);
};

const BoardWrapper = styled.div`
	max-height: calc(100vh - 100px - 151px);
	width: 96%;
	max-width: 1100px;
	display: flex;
	margin: 0 auto;
`;

const BoardTitleWrapper = styled.div`
  display: flex;
  width: 1100px;
  height: fit-content;
	justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #b5b5b5;
	border-top: none;
	border-left: none;
	border-right: none;

  margin-top: 62px;
  padding-bottom: 28px;
`;

const BoardTitle = styled.div`
	height: 40px;
	width: fit-content;
	font-size: 28px;
	font-weight: 700;
	background-color: #f9f9f9;
	font-weight: 700;
	display: flex;
`;

const BoardDetail = styled.div`
	margin-top: 15px;
	font-weight: 700;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BoardDate = styled.div`
	color: #747474;
	font-weight: 500;
`;

const BoardEdit = styled.button`
	border: none;
	background-color: #f9f9f9;
	justify-content: end;
	cursor: pointer;
	font-weight: 700;
	color: #747474;
`;
const BoardDelete = styled.button`
	border: none;
	background-color: #f9f9f9;
	cursor: pointer;
	color: #747474;
	font-weight: 700;
	:hover {
		color: red;
	}
`;

const BoardScrapButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;

  cursor: pointer;


`;

const ScrapIcon = styled.img`
  position: relative;
  width: 18px;
  height: 18px;
  
  margin-right : 4px;
`;

const BoardScrapButton = styled.div`
  width: 110px;
  height: 23px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;

  color: #000000;

`;

const QuestionsBlock = styled.div`
	::-webkit-scrollbar {
		display: none;
	}
	max-height: calc(100% - 60px - 20px - 40px - 68px);
	margin: 10px 0;
	overflow: auto;
  margin-top: 20px;
	> li {
		width: 988px;
		min-height: calc(88px - 32 * 2px);
		max-height: calc(133px - 32 * 2px);
		// margin-top: 20px;
		margin-bottom: 20px;
		border: none;
		border-left: 12px solid #2e55e7;
		background-color: #fff;
		font-weight: 700;
		color: #252525;
		font-size: 1.2rem;
		// display: flex;
		align-items: center;
		gap: 20px;
		border-radius: 8px;
		box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
		padding: 32px 50px;
		outline: none;
		overflow: auto;
	}
`;
export default InterviewView;
