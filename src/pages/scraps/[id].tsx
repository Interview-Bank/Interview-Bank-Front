import { Button } from '@/components/atoms/Button';
import { SeoHead } from '@/components/atoms/SeoHead';
import { InterviewTitleArea } from '@/components/molecules/Interview/InterviewTitleArea';
import { QuestionComponent } from '@/components/molecules/QuestionComponent';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { bringScrapOriginalListData, bringScrapRelationData, sendScrapData } from '../api/Scrap/scrapFetchDataAPI';
import { MultiReadSelect } from '@/components/molecules';
import { Label } from '@/components/atoms';
import { AnswerComponent } from '@/components/molecules/AnswerComponent';

const dummyData = {
  title: '네이버네이버네이버네이버네이버네이버네이버',
  date: '2023.03.28',
  view: 0,
  writerNickname: 'JINU',
  accountId: 1,
  item: {
    questionId  : 1,
    content     : '2',
    createdAt   : '2023.03.28',
    deletedAt   : null,
    deletedFlag : false,
    gptAnswer   : '',
    updatedAt   : '2023.03.28',
  }
}

const RelationScraps = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div onMouseEnter={() => setToggle(true)}>
        <div className="scraps__relation__title">
          <div>1</div>
          <Button value='' image={'LIKE'} />
        </div>
        <div className="scraps__relation__content">
          <h4>{dummyData.title}</h4>
          <Label text={dummyData.writerNickname} />
        </div>
      </div>
      {toggle
        &&  <div className='scraps__relation--active'>
              <Button image={"CLOSE"} value='' onClickEvent={() => { setToggle(false) }} />
              <div className="relation__title">
                <InterviewTitleArea
                  title						= {dummyData.title}
                  date						= {dummyData.date}
                  accountId				= {dummyData.accountId}
                  btnArea         = {false}
                  propsValue      = {'scrap'}
                  writerNickname	= {dummyData.writerNickname}
                  view						= {dummyData.view}
                />
              </div>
              <div className="relation__content">
                <AnswerComponent 
                  item			=	{dummyData.item}
                />
                <AnswerComponent 
                  item			=	{dummyData.item}
                />
                <AnswerComponent 
                  item			=	{dummyData.item}
                />
                <AnswerComponent 
                  item			=	{dummyData.item}
                />
              </div>
            </div>
      }
    </div>
  )
}

interface AnswersProps {
  [key: string]: boolean;
}

interface InterviewListProps {
  originalInterview: {
    interviewId: number;
    title: string;
  }
  scrap: {
    createdAt: string;
    isPublic: boolean;
    scrapId: number;
    title: string;
    view: number;
    writerAccountId: number;
    writerNickname: string;
  }
  scrapQuestionWithScrapAnswersList: ScrapQuestionProps[]
}

interface ScrapQuestionProps {
  content: string;
  gptAnswer: string | null;
  scrapAnswerResponseList: {
    content: string | null;
    scrapAnswerId: number;
  }[]
  scrapQuestionId: number;
}

const ScrapPage = () => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [toggle, setToggle] = useState(false);
  const [contents, setContents] = useState([]);
  const [interviewList, setInterviewList] = useState<InterviewListProps>();
  const [answers, setAnswers] = useState<any>({});
  const [inputValues, setInputValues] = useState<any>({});
  const [relationToggle, setRelationToggle] = useState(false);

  const toggleSwitch = () => {
    setToggle(prev => !prev);
  }
  
  const toggleAnswerInput = (index: number) => {
    setAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [index]: !prevAnswers[index],
    }));
  };
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

  useEffect(() => {
    bringScrapOriginalListData(`${router.query.id}`)
      .then(response => {
        setInterviewList(response)
        setContents(response.scrapQuestionWithScrapAnswersList)
        setAnswers((prevAnswer: any) => ({
          ...prevAnswer,
          [0]: true
        }))
        bringScrapRelationData(`${response.originalInterview.interviewId}`)
          .then(response => console.log(response));
      })
      .catch(reject => console.log(reject));
  }, []);

  useEffect(() => {
    inputRefs.current.forEach((inputRef, index) => {
      if (answers[index]) {
        (inputRef as HTMLElement).style.height = "auto";
        (inputRef as HTMLElement).style.height = (inputRef as HTMLElement).scrollHeight + "px";
      }
    });
  }, [answers]);

  useEffect(() => {
    setInputValues(
      contents.map((item: ScrapQuestionProps) => 
        item.scrapAnswerResponseList[0].content
      )
    );
  }, [contents]);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValues({ ...inputValues, [index]: e.currentTarget.value });
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleInputLimit = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const maxLengthInBytes = 65535;
    const inputText = e.currentTarget.value;
    const byteCount = new Blob([inputText]).size;
  
    if (byteCount > maxLengthInBytes) {
      e.currentTarget.setCustomValidity("글자 수가 65,535 바이트를 초과하였습니다.");
      e.currentTarget.reportValidity();
      e.currentTarget.value = inputText.slice(0, maxLengthInBytes);
    } else {
      e.currentTarget.setCustomValidity("");
    }
  };

  const saveScrapAnswers = () => {
    contents.map(async (item: ScrapQuestionProps, index) => {
      let updateContent = inputValues[index] === undefined
        ? (item.scrapAnswerResponseList[0].content === null ? "" : item.scrapAnswerResponseList[0].content)
        : inputValues[index];
      sendScrapData(item, updateContent, `${router.query.id}`)
        .then(response => router.push(`/scraps/${router.query.id}`))
        .catch(reject => console.log(reject))
    });
  }
  console.log(inputValues);
  console.log(contents);
  
  return (
    <section className="scrap__area">
      {interviewList?.scrap !== undefined
        &&  <>
              <SeoHead title='' />
              <div className="scrap__body">
                <InterviewTitleArea
                  title						= {interviewList.scrap.title}
                  date						= {interviewList.scrap.createdAt.slice(0, 10).replaceAll('-', '.')}
                  accountId				= {interviewList.originalInterview.interviewId}
                  toggle					= {toggle}
                  toggleSwitch		= {toggleSwitch}
                  propsValue      = {'scrap'}
                  writerNickname	= {interviewList.scrap.writerNickname}
                  view						= {interviewList.scrap.view}
                />
                {/* data 보내줌 필요 */}
                <MultiReadSelect
                  // interviewPeriod	= {interviewList.scrap.interviewPeriod}
                  // careerYear			= {interviewList.careerYear}
                  // firstLevelName	=	{interviewList.jobCategory?.firstLevelName}
                  // secondLevelName	=	{interviewList.jobCategory?.secondLevelName}
                  interviewPeriod	= {""}
                  careerYear			= {""}
                  firstLevelName	=	{""}
                  secondLevelName	=	{""}
                />
                {interviewList.scrapQuestionWithScrapAnswersList &&
                  <div className="questions__area">
                    {interviewList.scrapQuestionWithScrapAnswersList.map((item, index) => (
                      <QuestionComponent
                        item                = {item}
                        index               = {index}
                        key                 = {index}
                        answers             = {answers}
                        inputValues         = {inputValues}
                        toggleAnswerInput   = {toggleAnswerInput}
                        handleInputChange   = {handleInputChange}
                        handleInputLimit    = {handleInputLimit}
                        inputRefs           = {inputRefs}
                        gptToggle           = {toggle}
                      /> 
                    ))}
                    <div className="scraps__relation">
                      <RelationScraps />
                      <RelationScraps />
                    </div>
                  </div>
                  // response.questions.map((item, index) => (
                  //   <InterviewView content={item.content} key={index} />
                  // )) 
                }
                <div className="scrap__btn">    
                  <Button value='저장' onClickEvent={saveScrapAnswers} />
                </div>
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