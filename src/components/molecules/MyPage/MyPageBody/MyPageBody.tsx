import { useRouter } from 'next/router';
import React from 'react'
import { Pagination } from '../../Pagination';
import { TextComponent } from '../../TextComponent';
import styles from './MyPageBody.module.scss';

type Props = {}

const MyPageBody = ({ totalPosts, totalPages, limit, setPage, myPostParam, boardList, isLoading, type }) => {
  const router = useRouter();
  return (
    <div className={styles.page__body}>
      <h4>게시글 관리</h4>
      {/* <h4>{router.query.my === 'my-post' ? '작성한 게시글' : '작성한 답변글'}</h4> */}
      <ul className={styles.page__menu}>
        <li
          className={`${router.query.my === 'my-post' ? styles['page__menu--active'] : undefined}`}
          onClick={() => router.push('/mypage/my-post')}
        >
          작성한 게시글
        </li>
        <li
          className={`${router.query.my === 'my-scrap' ? styles['page__menu--active'] : undefined}`}
          onClick={() => router.push('/mypage/my-scrap')}
        >
          작성한 답변글
        </li>
        <li>임시저장한 게시글</li>
        <li>임시저장한 답변글</li>
      </ul>
      <div className={styles.divide__line}></div>
      <div className={styles.page__content}>
        {!isLoading && boardList ? (
          <>
            <div className={styles.page__grid}>
              {boardList.map((current) => (
                <TextComponent
                  id={type !== 'scraps' ? current.interviewId : current.scrapId}
                  nickname={current.nickname}
                  createdAt={current.createdAt
                    .slice(0, 10)
                    .replaceAll("-", ".")}
                  title={current.title}
                  firstCategoryName={current.jobCategory.firstLevelName}
                  secondCategoryName={current.jobCategory.secondLevelName}
                  type={type}
                />
              ))}
            </div>
            <div className={styles.page__paging}>
              {totalPages && 
                <Pagination limit={limit} setPage={setPage} page={myPostParam.page} totalPosts={totalPosts} totalPages={totalPages}/>
              }
            </div>
          </>
        ) : (
            <div className={styles.empty}>
              <h4>
                조건에 맞는 결과가 없습니다.
                <br />
                다른 키워드로 검색하시거나, 필터 옵션을 변경해 주세요.
              </h4>
            </div>
        )}
      </div>
    </div>
  )
}

export { MyPageBody };