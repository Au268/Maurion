export const editProductAPI = async (productId, productData) => {
  const formData = new FormData();

  formData.append("title", productData.title);
  formData.append("category", productData.category);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("stock", productData.stock);

  productData.colors.forEach((color) => {
    formData.append("colors", color);
  });

  // Tell the server which existing images to keep (the ones not removed by the user)
  // keepImages = array of { url, publicId } the user did NOT delete
  if (productData.keepImages) {
    formData.append("keepImages", JSON.stringify(productData.keepImages));
  }

  // Append any brand-new files the user added
  (productData.newImageFiles || []).forEach((file) => {
    formData.append("images", file);
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const response = await fetch(`${BASE_URL}/api/products/edit/${productId}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update product");
  return data;
};