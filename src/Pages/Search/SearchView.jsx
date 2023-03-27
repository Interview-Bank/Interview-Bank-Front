import styled from "styled-components";
import Layout from "../../Layout/Layout";
import Search from "../../Assets/Images/search.png";

const SearchInterviewView = () => {
  return (
    <Layout>
      <SearchWrapper>
        <h1>검색 결과</h1>
        <SearchFlex>
          <SerachSide>
            <SearchItem>
              <input type="text"></input>
              <img src={Search} alt="search" />
            </SearchItem>
            <SearchItem>
              <SearchCarrerArea>
                <h2>
                  직무 구분
                </h2>
                {/* <input type="checkbox" name="1" id="1">개발</input> */}
              </SearchCarrerArea>
            </SearchItem>
          </SerachSide>
          <SearchArea>

          </SearchArea>
        </SearchFlex>
      </SearchWrapper>
    </Layout>
  );
};

const SearchWrapper = styled.div`
  min-height: calc(100vh - 60px - 151px);
  width: 96%;
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  margin: 0px auto 150px;
  > h1 {
    height: 40px;
    width: 1096px;
    padding-top: 20px;
    font-size: 28px;
    font-weight: 700;
    background-color: #f9f9f9;
    font-weight: 700;
    margin-top: 60px;
    display: flex;
    margin-bottom: 24px;
  }
`;

const SearchFlex = styled.div`  
  display: flex;
  width: 100%;
  height: 100%;
`;

const SerachSide = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(32% - 40px);
  margin-right: 40px;
  height: 100%;
  > not:first-child {
    margin-bottom: 25px;
  }
`;

const SearchItem = styled.div`
  position: relative;
  width: 100%;
  > input {
    width: calc(100% - 20px);
    border: 1px solid #2E55E7;
    border-radius: 8px;
    font-size: 1.2rem;
    padding: 0 10px;
    height: 45px;
  }
  > img {
    width: 36px;
    position: absolute;
    top: 6px;
    right: 0px;
  }
`;

const SearchCarrerArea = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  background-color: white;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  padding: 0px 10px 16px;
`

const SearchArea = styled.div`
  width: 68%;
  background-color: white;
  border-radius: 16px;
  border: 1px solid #D9D9D9;
  min-height: calc(100vh - 60px - 151px);
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
  ::-webkit-scrollbar {
    display: none;
  }
  max-height: calc(100% - 60px - 20px - 40px - 68px);
  margin: 10px 0;
  overflow: auto;
  > li {
    width: 988px;
    height: 65px;
    margin-top: 20px;
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
export default SearchInterviewView;
