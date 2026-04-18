export const orders = [
  {
    id: "#MN-89231",
    customer: { name: "Julianne Heffernan", email: "j.heff@minimalist.co", initials: "JH" },
    items: "Obsidian Tote, Silk Scarf (2)",
    date: "Oct 12, 2023",
    total: "$584.00",
    status: "Delivered",
  },
  {
    id: "#MN-89228",
    customer: { name: "Marcus Aurel", email: "maurel@stoic.eu", initials: "MA" },
    items: "Matte Ceramic Vase",
    date: "Oct 11, 2023",
    total: "$120.00",
    status: "In Transit",
  },
  {
    id: "#MN-89215",
    customer: { name: "Elena Saffron", email: "elena@creative.studio", initials: "ES" },
    items: "Wool Blend Coat, Suede Loafers",
    date: "Oct 11, 2023",
    total: "$1,450.00",
    status: "Shipped",
  },
  {
    id: "#MN-89212",
    customer: { name: "Thomas Kaine", email: "kaine@design.co", initials: "TK" },
    items: "Graphite Notebook Set (3)",
    date: "Oct 10, 2023",
    total: "$85.00",
    status: "Processing",
    tag: "Expedited",
  },
  {
    id: "#MN-89210",
    customer: { name: "Sarah Bloom", email: "sarah@bloom.com", initials: "SB" },
    items: "Linen Bedding Set - Queen",
    date: "Oct 10, 2023",
    total: "$340.00",
    status: "Cancelled",
  },
];

export const recentOrders = [
  { id: "#MN-29401", customer: "Julianna H.", initials: "JH", date: "Oct 24, 2023", total: "$420.00", status: "Shipped" },
  { id: "#MN-29398", customer: "Marcus K.", initials: "MK", date: "Oct 23, 2023", total: "$1,150.00", status: "Pending" },
  { id: "#MN-29395", customer: "Elena L.", initials: "EL", date: "Oct 23, 2023", total: "$235.50", status: "Delivered" },
  { id: "#MN-29391", customer: "Samuel T.", initials: "ST", date: "Oct 22, 2023", total: "$89.00", status: "Delivered" },
];

export const products = [
  {
    id: "MN-PL-001",
    name: "Classic Piqué Polo",
    category: "Polo Shirts",
    price: "$85.00",
    stock: 124,
    status: "In Stock",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCytfnZATMiQco8oYnvFTme9ycvVvdMZqnjqrt41D4tjn7D407YchWlapowrei5Qo-LZ-dEyA1O1DjnJrY2wI_MTloBw3JXx0hMKqn5rCqjhL_3M7w0um7P4AWcj9KjvlfBbzd8TOcSJCecE7FDFbE7UBJ8AagHDT4lKKfYUsm2FRTZKqztD_jqWekYoB9S8Ri1SBczZfom7yAZtGsJp5mkeWI883c0WkkC1O0uU-Fk-shN0BWTLO8HudWrACO1EktNF3HnTks-KgvX",
  },
  {
    id: "MN-TR-042",
    name: "Essential Tracksuit",
    category: "Tracksuits",
    price: "$210.00",
    stock: 8,
    status: "Low Stock",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdq1jdmFGW-NIo69i794G1Aw5jvH9Camgcx-x_-k9NVIYaTB7wF0vBBRaYXWK9xtm-1So57Bx1E-xhwl4VnVmIGBgTgzsY9Zouh-e1iFZyog7HcrQVRVjAvc0cqhGBc1Mf8cLzvzTQsnEedkZB-AF6batM3bguM2wLFRY2qnpS113Ox35bD0PfexGUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-aSh2qlhMx2v36bbJGvdAnkQfA7GW2uo3ZeyejaGEwH-y170EiO1e3czhFHOLHHVFH7ArD-yg",
  },
  {
    id: "MN-TS-088",
    name: "Maurion Noir Logo Tee",
    category: "T-Shirts",
    price: "$55.00",
    stock: 432,
    status: "In Stock",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnFL7lNUCVFg8wtf6W3VNjVAoie0_H1lZ59wj5dujwbCaxsZM82mPuB2znJg2KJllRh0med8herGAl7ZhXomy0dHiPSmauY5i5QysbT4W1pifSn310XdNcCRWISxXNtKGrw41OzaNJPmsKLt24mDtueKcCzPuNnqOWA1MNerfvscRECGrzXSKYp2zV0JZlGx-5pv_aBHe2epcVgepWeLiukg0iq9Od9Lswv5ov_Nd1ENgDIhodv_QaoFTctm9zV8Hz3leaa8QzZufM",
  },
];

export const topSellers = [
  { name: "The Monolith Boot", category: "Footwear", units: 242, revenue: "$28,500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzPGBoZjXS5X2tclJ1Xc7mes5SHrDtAhU-ZQa4KyFqdL9-a3f0XFnY-6vGrK85BNOJtOzXp0jqxFBia_0DDiMHT2I-TZOGhkKrSMbGCjkGQ_8i2z8PVXCj6FOhWB3m0LVTIBwiBZFu1z-7dklBCfujOfwDbe4DloXsfkb2GwssQ-qWNI56J72Noricf9ukdK3CZDuujAJoPQg4uSs-6Opl3egB20QjoXJW9_8ANDye4dv7q2iA8OtJMZrWRxU7tXoQwkIOSW4KenIo" },
  { name: "Editorial Wool Coat", category: "Outerwear", units: 189, revenue: "$22,680", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL0Zv4iz2N9qRUJeEk8cMZjBWc9JpzsoghNWZ-g33yFaOpewHniLIipcB_RvosakUmQ-_zf12i_6_wwhnRdN9W0z4f_jvSwCOZM7VSZ7R_ofFUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-e62v2zDvJUZUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW_70iuQfcWga7LwHtKbFWt_8KX4NCsPGR6VbOv_JKNYqY9ZmoUjIG8" },
  { name: "Curated Leather Tote", category: "Accessories", units: 115, revenue: "$16,100", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR6HxtDpIlkmtcnlsYM4y9A8Vmi2POr6XHPLix-nVxIrXYOUQDvDUxFShoWWbHougyHjr0tFz3E38fX8e0bnTUpya-P0mXW-aSh2qlhMx2v36bbJGvdAnkQfA7GW2uo3ZeyejaGEwH-y170EiO1e3czhFHOLHHVFH7ArD-yg-xSkil8-uGijKsX7J2utNIrFN490lryk_IRzlfPYsBvQeNxOWe7mTQFpydALfu4m4WQGZjTkhkYtCxSEBThy08XiP-phWThUDGHM6N" },
];