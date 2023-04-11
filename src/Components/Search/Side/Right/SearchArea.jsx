import PostComponent from '../../../../Layout/PostList/PostComponent';

const SearchArea = ({ searchParam, interviewList }) => {
  const { category } = searchParam;
	return (
		<div className="search__area">
			{interviewList.length ? (
				<div className="search-list">
					{interviewList.length && category
						? interviewList
                .filter((current) => current.category === category)
                .map((current) =>
                  <PostComponent
                    key={current.interviewId}
                    id={current.interviewId}
                    title={current.title}
                    nickname={current.nickname}
                    firstCategoryName={current.jobCategory.firstLevelName}
                    secondCategoryName={current.jobCategory.secondLevelName}
                    createdAt={current.createdAt.slice(0, 10).replaceAll("-", ".")}
                  />
                )
						: interviewList.map((current) => (
              <PostComponent
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
			) : (
				<div className="search-empty">
					<h4>
						요청하신 조건에 맞는 검색 결과가 없습니다.
						<br />
						다른 키워드로 검색하시거나, 필터 옵션을 변경해 주세요.
					</h4>
				</div>
			)}
			<style jsx>{`
				.search__area {
					width: 68%;
					min-height: calc(100vh - 60px - 151px);
				}
				.search-empty {
					text-align: center;
					width: 100%;
					height: 100%;
					border-radius: 16px;
					border: 1px solid #d9d9d9;
					background-color: white;
					color: #ababab;
					font-size: 24px;
					padding-top: 12rem;
				}
				.search-empty > span {
					width: 100%;
				}
				.search-list {
					display: grid;
					width: 100%;
					grid-template-columns: repeat(3, 1fr);
					gap: 30px;
				}
			`}</style>
		</div>
	);
};

export default SearchArea;