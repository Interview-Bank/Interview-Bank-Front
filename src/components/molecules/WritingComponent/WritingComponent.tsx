import React from "react";
import { useState } from "react";
import whiteLike from "../../Assets/Images/Icons/white_heart.png";
import blueLike from "../../Assets/Images/Icons/blue_heart.png";
import styles from './WritingComponent.module.scss';
import { useRouter } from 'next/router';

const WritingComponent = ({
	id,
	title,
	nickname,
	firstCategoryName,
	secondCategoryName,
	createdAt,
}) => {
  const router = useRouter();
	// const [like, setLike] = useState(false);
	return (
    <div className={styles.write__area} onClick={() => router.push(`/interview/${id}`)}>
      <div className={styles.write__content}>
				<div className={styles.write__job}>
          <span className={styles[`font-blue`]}>{firstCategoryName}</span>
          <span className={styles[`font-blue`]}>{secondCategoryName}</span>
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

export { WritingComponent };
