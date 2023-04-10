import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import "react-datepicker/dist/react-datepicker.css";

const SearchDateInput = () => {
  const defaultValue = { startDate: new Date(), endDate: new Date() };

  const [date, setDate] = useState(defaultValue);
  return (
    <>
      <DatePicker 
        selected={date.startDate} 
        // onChange={(date) => setDate((prev)=>({...prev, startDate: date}))}
        locale={ko}
        dateFormat= "yyyy-MM-dd"
        className='date__input'
      />
      <DatePicker 
        selected={date.endDate} 
        // onChange={(date) => setDate((prev)=>({...prev, endDate: date}))} 
        locale={ko}
        dateFormat= "yyyy-MM-dd"
        className='date__input'
      />
      <style jsx>{`
        .react-datepicker__input-container > input {
          width: 100%;
          border: 0px solid transparent;
          padding: 0;
          height: 40px;
          font-size: 1.1rem;
        }
        
        .react-datepicker__current-month {
          color: white;
        }

        .react-datepicker__header {
          background-color: #2E55E7;
        }

        .react-datepicker__day-name {
          color: white;
        }
      `}</style>
    </>
    // <div>SearchDateInput</div>
  )
}

export default SearchDateInput;