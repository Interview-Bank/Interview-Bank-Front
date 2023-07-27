import React, { useState } from "react";
import Search from "public/Icons/search.png";
import { useRouter } from 'next/router';
import styles from './HomeSearch.module.scss';
import Image from 'next/image';
import { IconImage, Input } from '@/components/atoms';

const HomeSearch = () => {
  const router = useRouter();
	const [searchTitle, setSearchTitle] = useState({title: ''})

	const searchOnChangeEvent = (name: string, value: string) => {
		setSearchTitle((prev) => {
			return { ...prev, [name]: value }
		});
	}

	const clickSearchButton = () => {
		router.push({
			pathname: '/search',
			query: { title: searchTitle.title }
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
					value						= {searchTitle.title}
					type						= 'text'
					placeholder			= '회사, 직무 등을 검색해주세요!'
					maxLength				= {48}
					onChangeEvent		= {searchOnChangeEvent}
					onKeyDown				= {true}
					onKeyDownEvent	= {clickSearchButton}
				/>
				<IconImage icon={"SEARCH"} />
				{/* <Image src={Search} alt="검색 버튼" /> */}
			</div>
		</div>
	);
};

export { HomeSearch };
