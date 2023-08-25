import axiosInstance from '../axiosInstance';

const bringScrapListData = async (pageNumber = 0, pageSize = 10) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps`,
      {
        params: {
          "page": pageNumber,
          "size": pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const bringScrapOriginalListData = async (scrapId: string) => {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/scraps/${scrapId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }  
}

const sendScrapData = async (itemArray: { scrapQuestionId: number; scrapAnswerResponseList: { scrapAnswerId: number; }[] }, updateContent: string, scrapId: string) => {
  try {
    const response = await axiosInstance.put(
      `${process.env.NEXT_PUBLIC_API_URL}/scraps/${scrapId}/questions/${itemArray.scrapQuestionId}/answers/${itemArray.scrapAnswerResponseList[0].scrapAnswerId}`,
      { content: updateContent },
    );
    if (response.status !== 200) {
      throw new Error(`Failed to update item, status code: ${response.status}, status text: ${response.statusText}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
//   try {
//     const responses = await Promise.all(
//       contents.map(async (item, index) => {

//         let updatecontent = inputValues[index] === undefined
//         ? (item.scrapAnswerResponseList[0].content === null ? "" : item.scrapAnswerResponseList[0].content)
//         : inputValues[index];

//         const url = `${ScrapBaseUrl}/${scrap_id}/questions/${item.scrapQuestionId}/answers/${item.scrapAnswerResponseList[0].scrapAnswerId}`;
//         const response = await axios.put(url, { content : updatecontent }, {headers});

//         if (response.status !== 200) {
//           throw new Error(`Failed to update item ${index}, status code: ${response.status}, status text: ${response.statusText}`);
//         }
//         return response;
//       }),
//   );
//   window.location.reload();
// } catch (error) {
//   console.error('Error:', error);
// }
  // try {
  //   const response = await axios.put(
  //     `${process.env.NEXT_PUBLIC_API_URL}/scraps/${scrapId}/questions/${}`,
  //     {
  //       headers: headers
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   throw new Error(`Error: ${error}`);
  // } 
}
  
export { bringScrapListData, bringScrapOriginalListData, sendScrapData };