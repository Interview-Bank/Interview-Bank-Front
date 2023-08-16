import axios from 'axios';

const getSecondLevelObject = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/job-categories/second-level`,
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
}
  
export { getSecondLevelObject };