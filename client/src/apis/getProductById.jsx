const getProducts = async ({id}) => {
  const apiURL = "http://localhost:5000/api/products/getById";
  try {
    const response = await fetch(apiURL,{
      method:"POST",
      body:JSON.stringify(id),
      headers:{"Content-Type":"application/json"}
    });
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
     const result = await response.json();
     return result;
    
    } catch (error) {
      console.error("Error fetching data:", error);
    }
};

export default getProducts;
