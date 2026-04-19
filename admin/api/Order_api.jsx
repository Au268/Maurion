const getOrders = async () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const apiURL = `${BASE_URL}/api/orders/get`;

  try {
    const response = await fetch(apiURL, { method: "GET" });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();


    if (result.success) {
      return result.orders; 
    }

    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; 
  }
};

export default getOrders;