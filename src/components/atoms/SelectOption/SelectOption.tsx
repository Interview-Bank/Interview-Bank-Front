import React        from 'react'
import styles       from './Input.module.scss';

interface SelectOptionProps {
  name            : string;
  value           : string;
  type            : string;
  placeholder     : string;
  maxLength      ?: number;
  onChangeEvent   : (name: string, value: string) => void;
  onKeyDown      ?: boolean;
  onKeyDownEvent ?: () => void;
  pattern        ?: string;
  InquiryTypeList : {
                      type: string;
                      index: string;
                    }[];
}

const SelectOption = ({
  name,
  value,
  type             = 'text',
  placeholder,
  maxLength        = 9999,
  onChangeEvent,
  onKeyDown        = false,
  onKeyDownEvent,
  pattern          = '',
  InquiryTypeList
}: SelectOptionProps) => {
  const keyPressDownEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    (e.key === 'Enter' && onKeyDownEvent) && onKeyDownEvent();
  }

  return (
    <select>
      <option value="" disabled hidden>카테고리</option>
        {/* {InquiryTypeList.map((type, index) => (
          // <option key={index} value={type}>
          //   {type}
          // </option>
        ))} */}
    </select>
  )
}

export { SelectOption };