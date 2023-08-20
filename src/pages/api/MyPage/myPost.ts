import axiosInstance from '../axiosInstance';

const bringMyPostListData = async (scrapParam, pageSize = 15) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/interview/me`,
      {
        params: {
          page: scrapParam.page-1,
          size: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const bringMyScrapListData = async (scrapParam, pageSize = 15) => {  
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        params: {
          page: scrapParam.page-1,
          size: pageSize,
        },
      }
    );    
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { bringMyPostListData, bringMyScrapListData };