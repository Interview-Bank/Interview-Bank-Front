import { PostWrite } from '@/components/molecules/PostWrite';
import React from "react";
import styles from './PostBody.module.scss';

export interface PostBodyCommonProps {
	inputs: any;
	onRemove: (id: number) => void;
	onChange: (questionsId: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleInputLimit: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

interface PostBodyProps extends PostBodyCommonProps {
	onAddInput: () => void;
}

const PostBody = ({
	inputs,
	onRemove,
	onChange,
	onAddInput,
	handleInputLimit
}: PostBodyProps) => {
	return (
		<div className={styles.write}>
			<PostWrite inputs={inputs} onRemove={onRemove} onChange={onChange} handleInputLimit={handleInputLimit} />
			<button className={styles[`write__btn--add`]} onClick={onAddInput}>
				+추가하기
			</button>
		</div>
	);
};

export { PostBody };
