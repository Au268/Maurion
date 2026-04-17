const getProducts = async () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const apiURL = `${BASE_URL}/api/products/get`;

  try {
    const response = await fetch(apiURL, { method: "GET" });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "Success") {
      return result;
    }

    return null; // ✅ always return something

  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // ✅ return null instead of undefined
  }
};

export default getProducts;