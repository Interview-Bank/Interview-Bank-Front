import React from 'react';
import styles from './MultiReadSelect.module.scss';
import { IconImage, Label } from '@/components/atoms';
import { getInterviewNameFromValue } from '@/pages/api/getInterviewPeriodName';
import { getCareerYearNameFromValue } from '@/pages/api/getCareerYearName';

interface MultiReadSelectProps {
	interviewPeriod		: string;
	careerYear				: string;
	firstLevelName		: string;
	secondLevelName	  : string;
}

const MultiReadSelect = ({
	interviewPeriod,
	careerYear,
	firstLevelName,
	secondLevelName
}: MultiReadSelectProps) => {
  return (
    <div className={styles.select__area}>
			<div>
				<Label text={getInterviewNameFromValue(interviewPeriod)} />
				<IconImage icon={'ARROW-DOWN'} />
			</div>
			<div>
				<Label text={getCareerYearNameFromValue(careerYear)} />
				<IconImage icon={'ARROW-DOWN'} />
			</div>
			<div>
				<Label text={firstLevelName} />
				<IconImage icon={'ARROW-DOWN'} />
			</div>
			<div>
				{secondLevelName
					&& 	<>
								<Label text={secondLevelName} />
								<IconImage icon={'ARROW-DOWN'} />
							</>
				}
			</div>
		</div>
  )
}

export { MultiReadSelect };