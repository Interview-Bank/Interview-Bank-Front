import { Button, Input } from '@/components/atoms';
import React from "react";
import styles from './PostTitle.module.scss';

interface PostTitleProps {
	title									: string;
	type									: 'R' | 'I';	
	changeTitleValue			: (name: string, value: string) => void;
	clickPostInterview		: () => void;
}

const PostTitle = ({
	title,
	type,
	changeTitleValue,
	clickPostInterview
}: PostTitleProps) => {
	return (
		<div className={styles.title}>
			{type === 'I'
				? <Input
						name						= "title"
						value						= {title}
						placeholder			= "제목을 입력하세요"
						type						= "text"
						maxLength				= {128}
						onChangeEvent		= {changeTitleValue}
					/>
				: <h2>{title}</h2>
			}
			<div className={styles.title__btn}>
				<Button value='발행하기' onClickEvent={clickPostInterview}/>
			</div>
		</div>
	);
};

export { PostTitle };