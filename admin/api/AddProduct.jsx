export const addProductAPI = async (productData) => {
  const formData = new FormData();

  formData.append("title", productData.title);
  formData.append("category", productData.category);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("stock", productData.stock);

  productData.colors.forEach((color) => {
    formData.append("colors", color);
  });

  // Append each image file under the same key 'images'
  (productData.imageFiles || []).forEach((file) => {
    formData.append("images", file);
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${BASE_URL}/api/products/add`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add product");
  return data;
};