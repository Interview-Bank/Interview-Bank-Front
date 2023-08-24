import axios from 'axios';

const baseUrl = 'https://bstaging.interviewbank.net/job-categories';

const getJobCategories = async () => {
  try {
    const response = await axios.get(baseUrl);
    // getSecondJobCategories(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const getFirstJobCategories = (array: { firstLevelId: number; firstLevelName: string; }[]) => {
  return array.map((current) => {return {id: current.firstLevelId, name: current.firstLevelName}});
}

const getSecondJobCategories = (array: { firstLevelId: number; firstLevelName: string; secondJobCategories: { secondLevelId: number; secondLevelName: string; }[]}[], id: number) => {  
  return array
          .filter((current) => current.firstLevelId === id)[0]?.secondJobCategories
          .map((current) => { return { id: current.secondLevelId, name: current.secondLevelName } });          
}

export { getJobCategories, getFirstJobCategories, getSecondJobCategories }