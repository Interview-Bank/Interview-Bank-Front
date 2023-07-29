import React, { useState } from "react";
import { useRouter } from 'next/router';

import whiteLike from "../../Assets/Images/Icons/white_heart.png";
import blueLike from "../../Assets/Images/Icons/blue_heart.png";
import styles from './TextComponent.module.scss';

import { Label } from '@/components/atoms';

interface TextComponentProps {
	id										: number;
	title									: string;
	nickname							: string;
	firstCategoryName			: string;
	secondCategoryName	 ?: string | null;
	createdAt							: string;
	type									: 'interview' | 'scraps';
}

const TextComponent = ({
	id,
	title,
	nickname,
	firstCategoryName,
	secondCategoryName,
	createdAt,
	type								 = 'interview',
}: TextComponentProps) => {
	const router = useRouter();

	const moveInterviewWritePage 	= () => router.push(`/interview/${id}`)
	const moveScrapWritePage 			= () => router.push(`/scraps/${id}`)

	// const [like, setLike] = useState(false);
	return (
		<div
			className={styles.write__area}
			onClick={() => type === 'scraps'
											? moveScrapWritePage()
											: moveInterviewWritePage()
			}
		>
      <div className={styles.write__content}>
				<div className={styles.write__job}>
					<Label text={firstCategoryName} />
					{secondCategoryName
						&&  <Label text={secondCategoryName} />
					}
				</div>
        <div className={styles.write__title}>
					<p>{title}</p>
				</div>
				<div className={styles.write__create}>
					<Label text={nickname} />
					<Label text={createdAt} />
				</div>
			</div>
      <div className={styles.btn__write}>지금 작성하기</div>
			{/* <div className="btn__like">
				{like ? (
					<img src={blueLike} alt="좋아요 아이콘" />
				) : (
					<img src={whiteLike} alt="좋아요 아이콘" />
				)}
			</div> */}
		</div>
	);
};

export { TextComponent };
