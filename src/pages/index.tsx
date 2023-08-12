import axios from 'axios';
import { SeoHead } from '@/components/atoms';
import { Banner, HomeSearch, TextComponent } from '@/components/molecules'
import { GetServerSideProps } from 'next';
import { bringHomeInterviewListData } from './api/Home/homeFetchDataAPI';
import { useState, useEffect } from 'react';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

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
  const { data, isError, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['interview'],
    ({pageParam = 0}) => bringHomeInterviewListData(12, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
      }
    });
  console.log(data?.pages);
  const [scrollInterviewList, setScrollInterviewList] = useState([...interviewList]);
  // const listRef = useInview(null);  
  const [ref, inView] = useInView();


  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, isLoading])
  

  return (
    <section className='home'>
      <SeoHead title='인터뷰 뱅크' />
      <Banner />
      <HomeSearch />
      <div className="home__title">
        <h2>최신 인터뷰 글 보기</h2>
      </div>
      <div className="home__list" ref={ref}>
        {scrollInterviewList?.map((interview) => (
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