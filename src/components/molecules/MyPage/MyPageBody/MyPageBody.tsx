import { useRouter } from 'next/router';
import React from 'react'
import { Pagination } from '../../Pagination';
import { WritingComponent } from '../../WritingComponent';
import styles from './MyPageBody.module.scss';

type Props = {}

const MyPageBody = ({ totalPosts, totalPages, limit, setPage, myPostParam, boardList, isLoading }) => {
  const router = useRouter();
  return (
    <div className={styles.page__body}>
      <h4>{router.query.my === 'my-post' ? '작성한 게시글' : '작성한 답변글'}</h4>
      <div className={styles.page__content}>
        {!isLoading && boardList.length > 0 ? (
          <>
            <div className={styles.page__grid}>
              {boardList.map((current) => (
              <WritingComponent
                id={current.interviewId}
                nickname={current.nickname}
                createdAt={current.createdAt
                  .slice(0, 10)
                  .replaceAll("-", ".")}
                title={current.title}
                firstCategoryName={current.jobCategory.firstLevelName}
                secondCategoryName={current.jobCategory.secondLevelName}
                />
              ))}
            </div>
            <div className={styles.page__paging}>
              {totalPages && 
                <Pagination limit={limit} setPage={setPage} page={myPostParam.page} totalPosts={totalPosts} totalPages={totalPages}/>
              }
            </div>
          </>
        ):( null)}
      </div>
    </div>
  )
}

export { MyPageBody };