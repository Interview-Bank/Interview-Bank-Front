import { WritingComponent } from '@/components/molecules/WritingComponent';
import React from 'react'
import styles from './SearchArea.module.scss';

type Props = {}

const SearchArea = ({totalPosts, totalPages, interviewList, limit, setPage, searchParam}) => {
  return (
    <div>
      {interviewList.length ? (
        <>
          <div className={styles.list}>
            {interviewList.map((current) => (
              <WritingComponent
                key={current.interviewId}
                id={current.interviewId}
                title={current.title}
                nickname={current.nickname}
                firstCategoryName={current.jobCategory.firstLevelName}
                secondCategoryName={current.jobCategory.secondLevelName}
                createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
              />
            ))}
          </div>
          <div className={styles.page}>
            {totalPages &&
              <Pagination limit={limit} setPage={setPage} page={searchParam.page} totalPosts={totalPosts} totalPages={totalPages} />
            }
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <h4>
            요청하신 조건에 맞는 검색 결과가 없습니다.
            <br />
            다른 키워드로 검색하시거나, 필터 옵션을 변경해 주세요.
          </h4>
        </div>
      )}
    </div>
  )
}

export { SearchArea };