import React from "react";
import { useState } from "react";
import whiteLike from "../../Assets/Images/Icons/white_heart.png";
import blueLike from "../../Assets/Images/Icons/blue_heart.png";
import styles from './TextComponent.module.scss';
import { useRouter } from 'next/router';

const TextComponent = ({
	id,
	title,
	nickname,
	firstCategoryName,
	secondCategoryName,
	createdAt,
	type = 'interview',
}) => {
	const router = useRouter();

	const movePageToInterviewWrite = () => {
		router.push(`/interview/${id}`)
	}

	const movePageToScrapWrite = () => {
		router.push(`/scraps/${id}`)
	}

	// const [like, setLike] = useState(false);
	return (
		<div
			className={styles.write__area}
			onClick={() => type === 'scraps'
											? movePageToScrapWrite()
											: movePageToInterviewWrite()
			}
		>
      <div className={styles.write__content}>
				<div className={styles.write__job}>
          <span className={styles[`font-blue`]}>{firstCategoryName}</span>
          <span className={styles[`font-gray`]}>{secondCategoryName}</span>
				</div>
        <div className={styles.write__title}>
					<p>{title}</p>
				</div>
        <div className={styles.write__create}>
					<span>{nickname}</span>
					<span>{createdAt}</span>
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
