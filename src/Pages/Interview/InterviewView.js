import { jwtUtils } from "../../utils/jwtUtils";
import moment from "moment";
import styled from "styled-components";
import Layout from "../../Layout/Layout";

const InterviewView = ({ interview, contents, token, accountId, userId }) => {
  return (
    <Layout>
      <BoardWrapper>
        <div className="board-body">
          <BoardTitle>{interview.title}</BoardTitle>
          <BoardDetail>
            <BoardDate>
              {moment(interview.created).add(9, "hour").format("YYYY-MM-DD")}
            </BoardDate>
            {jwtUtils.isAuth(token) && accountId === userId && (
              <div>
                <BoardDelete>삭제하기</BoardDelete>
                <BoardEdit>수정하기</BoardEdit>
              </div>
            )}
            {jwtUtils.isAuth(token) && accountId !== userId && (
              <BoardScrapButton>★ 스크랩</BoardScrapButton>
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
  min-height: 100vh;
  width: 96%;
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
`;

const BoardTitle = styled.div`
  border-bottom: 1px solid #b5b5b5;
  border-top: none;
  border-left: none;
  border-right: none;
  height: 40px;
  width: 1096px;
  padding-top: 20px;
  font-size: 28px;
  font-weight: 700;
  background-color: #f9f9f9;
  font-weight: 700;
  margin-top: 60px;
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
  color: #747474;
`;
const BoardDelete = styled.button`
  border: none;
  background-color: #f9f9f9;
  cursor: pointer;
  color: #747474;
  :hover {
    color: red;
  }
`;

const BoardScrapButton = styled.button`
  display: block;
  border-radius: 30px;
  border: none;
  background-color: #2e55e7;
  color: #fff;
  font-weight: 700;
  width: 100px;
  height: 30px;
  cursor: pointer;
`;

const QuestionsBlock = styled.div`
  > li {
    width: 988px;
    height: 65px;
    margin-top: 30px;
    margin-bottom: 18px;
    border: none;
    border-left: 12px solid #2e55e7;
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
  }
`;
export default InterviewView;