const getDateFormatString = (date) => { //yyyy-mm-dd
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

const setCaculateYear = (month) => {
  const today = new Date();
  return new Date(today.setFullYear(today.getFullYear() + month));
}

const setCaculateMonth = (month) => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth() + month));
}

export { getDateFormatString, setCaculateYear, setCaculateMonth };