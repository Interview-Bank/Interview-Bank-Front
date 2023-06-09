import { SeoHead } from '@/components/atoms/SeoHead';
import { InterviewTitleArea } from '@/components/molecules/Interview/InterviewTitleArea';
import { modalSlice } from '@/redux/modalReducer';
import { tokenSlice } from '@/redux/tokenReducer';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { setTokenHeaders } from '../api/login/loginCheck';
import { bringScrapOriginalListData } from '../api/Scrap/scrapFetchDataAPI';

interface RootState<T> {
  [x: string]: T;
}

interface TokenModalStateType {
  'X-Auth-Token': string;
}

const ScrapPage = ({response}) => {
  const router = useRouter();  
  const [toggle, setToggle] = useState(false);
  // const { scrap_id } = useParams();
  // const [board, setBoard] = useState({});
  // const [boardId, setBoardId] = useState(0);
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState([]);  
  // const headers = setTokenHeaders();

  const [interviewList, setInterviewList] = useState({});
  const [answers, setAnswers] = useState({});
  const [inputValues, setInputValues] = useState({});

  const toggleSwitch = () => {
    setToggle(prev => !prev);
  }
  // const toggleAnswerInput = (index) => {
  //   setAnswers((prevAnswers) => ({
  //     ...prevAnswers,
  //     [index]: !prevAnswers[index],
  //   }));
  // };

  // const handleInputChange = (index, e) => {
  //   setInputValues({ ...inputValues, [index]: e.target.value });
  //   e.target.style.height = "inherit";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  // const handleWrapperClick = (e) => {
  //   e.stopPropagation();
  // };

  // const handleInputLimit = (e) => {
  //   const maxLengthInBytes = 65535;
  //   const inputText = e.target.value;
  //   const byteCount = new Blob([inputText]).size;
  
  //   if (byteCount > maxLengthInBytes) {
  //     e.target.setCustomValidity("글자 수가 65,535 바이트를 초과하였습니다.");
  //     e.target.reportValidity();
  //     e.target.value = inputText.slice(0, maxLengthInBytes);
  //   } else {
  //     e.target.setCustomValidity("");
  //   }
  // };

  // const inputRefs = useRef([]);

  // useEffect(() => {
  //   inputRefs.current.forEach((inputRef, index) => {
  //     if (answers[index]) {
  //       inputRef.style.height = "auto";
  //       inputRef.style.height = inputRef.scrollHeight + "px";
  //     }
  //   });
  // }, [answers]);

  // useEffect(() => {
  //   setInputValues(
  //     contents.map((item) =>
  //       item.scrapAnswerResponseList[0].content === null
  //         ? ""
  //         : item.scrapAnswerResponseList[0].content
  //     )
  //   );
  // }, [contents]);

  // useEffect(() => {
  //   const getBoard = async () => {
  //     const { data } = await axios.get(
  //       `${ScrapBaseUrl}/${scrap_id}`,
  //       { headers }
  //     );
  //     setTitle(data.scrap.title);
  //     setBoardId(data.originalInterview.interviewId);
  //     console.log(data);
  //     return data;
  //   };
  //   getBoard().then((result) => {
  //     setBoard(result);
  //     setContents(result.scrapQuestionWithScrapAnswersList);
  //   });
  // }, []);

  // const handleScrapAnswer = async () => {
  //   console.log(contents)
  //   try {
  //     const responses = await Promise.all(
  //       contents.map(async (item, index) => {

  //         let updatecontent = inputValues[index] === undefined
  //           ? (item.scrapAnswerResponseList[0].content === null ? "" : item.scrapAnswerResponseList[0].content)
  //           : inputValues[index];

  //         const url = `${ScrapBaseUrl}/${scrap_id}/questions/${item.scrapQuestionId}/answers/${item.scrapAnswerResponseList[0].scrapAnswerId}`;
  //         const response = await axios.put(url, { content: updatecontent }, { headers });

  //         if (response.status !== 200) {
  //           throw new Error(`Failed to update item ${index}, status code: ${response.status}, status text: ${response.statusText}`);
  //         }
  //         return response;
  //       }),
  //     );
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  useEffect(() => {
    bringScrapOriginalListData(router.query.id)
      .then(response => setInterviewList(response))
      .catch(reject => console.log(reject));
  }, [])

  console.log(interviewList);
  console.log(interviewList.scrap !== undefined);
  console.log(interviewList.scrap !== null);
  return (
    <section className="scrap__area">
      {interviewList.scrap !== undefined
        &&  <>
              <SeoHead title='' />
              <div className="scrap__body">
                <InterviewTitleArea
                  title={interviewList.scrap.title}
                  date={interviewList.scrap.createdAt}
                  accountId={interviewList.accountId}
                  toggle={toggle}
                  toggleSwitch={toggleSwitch}
                />
                {/* {response.questions &&
                  response.questions.map((item, index) => (
                    <InterviewView content={item.content} key={index} />
                  )) 
                } */}
              </div>
            </>
      }
    </section>
  )
}
  
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const headers = setTokenHeaders();
//   // const response = [];
//   // let headers;
//   // if (typeof window !== undefined) {
//   //   headers = setTokenHeaders();
//   // };
//   console.log();

//   // const token = useSelector((state: RootState<TokenModalStateType>) => state.token);
  
//   bringScrapOriginalListData(context.query.id, headers)
//     .then(response => console.log(response))
//     .catch(reject => console.log(reject))
// 	// const response = await axios.get(`https://bstaging.interviewbank.net/scraps/${context.query.id}`, {headers})
//   return {
// 		props: {
// 			// response: response.data
// 			response: '1'
//     }
//   };
// }

export default ScrapPage;