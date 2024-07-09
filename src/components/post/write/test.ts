export const getStoreList = async () => {
  try {
    const response = await fetch("/api/store");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const insertStoreList = async () => {
//   try {
//     const data = await 
//   } catch(error) {
//     console.log(error);
    
//   }
// }