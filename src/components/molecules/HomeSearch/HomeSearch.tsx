import React, { useState } from "react";
import { useRouter } from 'next/router';
import styles from './HomeSearch.module.scss';
import { IconImage, Input } from '@/components/atoms';

const HomeSearch = () => {
  const router 												= useRouter();
	const [searchTitle, setSearchTitle] = useState('')

	const searchOnChangeEvent = (name: string, value: string) => {
		setSearchTitle(value);
	}

	const clickSearchButton = () => {
		router.push({
			pathname	: '/search',
			query			: {
										title: searchTitle
									}
		});
	}

  return (
    <div className={styles.search__area}>
			<h1>면접 정보 인터뷰 뱅크에서 알려드려요</h1>
			<div
				className={styles.search__input}
				onClick={() => { }}
			>
				<Input
					name						= 'title'
					value						= {searchTitle}
					type						= 'text'
					placeholder			= '회사, 직무 등을 검색해주세요!'
					maxLength				= {48}
					onChangeEvent		= {searchOnChangeEvent}
					onKeyDown				= {true}
					onKeyDownEvent	= {clickSearchButton}
				/>
				<IconImage icon={"SEARCH"} />
			</div>
		</div>
	);
};

export { HomeSearch };
