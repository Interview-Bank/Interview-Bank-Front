import { Pagination } from '@/components/molecules/Pagination';
import { TextComponent } from '@/components/molecules/TextComponent';
import React from 'react'
import styles from './SearchArea.module.scss';

const SearchArea = ({totalPosts, totalPages, interviewList, limit, setPage, searchParam}) => {
  return (
    <div>
      {interviewList.length ? (
        <>
          <div className={styles.list}>
            {interviewList?.map((interview) => (
              <TextComponent
                key                   = {interview.interviewId}
                id                    = {interview.interviewId}
                title                 = {interview.title}
                nickname              = {interview.nickname}
                firstCategoryName     = {interview.jobCategory.firstLevelName}
                secondCategoryName    = {interview.jobCategory.secondLevelName}
                createdAt             = {interview.createdAt.slice(0, 10).replaceAll("-", ".")}
                type                  = 'scraps'
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