const getProducts = async () => {
  const apiURL = "http://localhost:5000/api/products/get";
  try {
    const response = await fetch(apiURL,{
      method:"GET"
    });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
     const result = await response.json();
     if(result.status === "Success"){
      return result;
     }
     
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

export default getProducts;
