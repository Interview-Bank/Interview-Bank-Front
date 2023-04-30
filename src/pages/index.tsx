import { SeoHead } from '@/components/atoms/SeoHead';
import { Banner } from '@/components/molecules/Banner'
import { HomeSearch } from '@/components/molecules/HomeSearch'
import { WritingComponent } from '@/components/molecules/WritingComponent';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { bringHomeInterviewListData } from './api/Home/homeFetchDataAPI';

const HomePage = ({interviewList}) => {
  // const [interviewList, setInterviewList] = useState([]);

	// useEffect(() => {
	// 	bringHomeInterviewListData()
	// 		.then((result) => setInterviewList(result))
	// 		.catch((resolve) => console.log(resolve));
	// }, []);
  return (
    <>
      <SeoHead title='인터뷰 뱅크' />
      <section className='home'>
        <Banner />
        <HomeSearch />
        <div className="home__title">
				  <h2>최신 글 보기</h2>
        </div>
        <div className="home__list">
          {interviewList &&
            interviewList.map((current) => (
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

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get(`https://bstaging.interviewbank.net/interview`);
  return {
		props: {
			interviewList: response.data.interviews
      // response: response
    }
  };
}

// export default function Home() {
  
// }
