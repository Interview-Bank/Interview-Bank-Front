import axios from 'axios';
import { SeoHead } from '@/components/atoms';
import { Banner, HomeSearch, TextComponent } from '@/components/molecules'
import { GetServerSideProps } from 'next';
import { bringHomeInterviewListData } from './api/Home/homeFetchDataAPI';
import { useQuery } from 'react-query';

export interface InterviewListProps {
  interviewList: [
    {
      careerYear        : string;
      createdAt         : string;
      interviewId       : number;
      interviewPeriod   : string;
      jobCategory: {
        firstLevelName  : string;
        jobCategoryId   : number;
        secondLevelName : string | null;
      }
      nickname          : string;
      title             : string;
    }
  ];
}

const HomePage = ({ interviewList }: InterviewListProps) => {
  const { data, isError, isLoading } = useQuery("interview", () => bringHomeInterviewListData(), { staleTime: 2000 })

  return (
    <>
      <SeoHead title='인터뷰 뱅크' />
      <section className='home'>
        <Banner />
        <HomeSearch />
        <div className="home__title">
				  <h2>최신 인터뷰 글 보기</h2>
        </div>
        <div className="home__list">
          {interviewList?.map((interview) => (
            <TextComponent
              key                 = {interview.interviewId}
              id                  = {interview.interviewId}
              nickname            = {interview.nickname}
              title               = {interview.title}
              firstCategoryName   = {interview.jobCategory.firstLevelName}
              secondCategoryName  = {interview.jobCategory.secondLevelName}
              createdAt           = {interview.createdAt.slice(0, 10).replaceAll("-", ".")}
              type                = "interview"
            />))
          }
        </div>
      </section>
    </>
  )
}


export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`https://bstaging.interviewbank.net/interview`, { params: { page: 0, size: 12 } });
  return {
		props: {
			interviewList: response.data.interviews
    }
  };
}