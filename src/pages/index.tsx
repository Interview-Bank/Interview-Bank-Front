import { SeoHead } from '@/components/atoms/SeoHead';
import { Banner } from '@/components/molecules/Banner'
import { HomeSearch } from '@/components/molecules/HomeSearch'
import { WritingComponent } from '@/components/molecules/WritingComponent';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { bringHomeInterviewListData } from './api/Home/homeFetchDataAPI';
import { useQuery } from 'react-query';

const HomePage = () => {
  const { data, isError, isLoading } = useQuery("interview", () =>bringHomeInterviewListData(), { staleTime: 2000 })

  const [interviewList, setInterviewList] = useState([]);
  
  useEffect(() => {
    bringHomeInterviewListData()
      .then((response) => setInterviewList([...response]));
  },[])

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
          {interviewList?.map((current) => (
              <WritingComponent
                id={current.interviewId}
                key={current.interviewId}
                nickname={current.nickname}
                createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
                title={current.title}
                firstCategoryName={current.jobCategory.firstLevelName}
                secondCategoryName={current.jobCategory.secondLevelName}
              />
            ))}
        </div>
      </section>
    </>
  )
}


export default HomePage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await axios.get(`https://bstaging.interviewbank.net/interview`, { params: { page: 0, size: 12 } });
//   return {
// 		props: {
// 			interviewList: response.data.interviews
//       // response: response
//     }
//   };
// }

// export default function Home() {
  
// }
