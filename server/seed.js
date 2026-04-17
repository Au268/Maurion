const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = "mongodb+srv://ubaidsgd321_db_user:NNTlDx86OcQ1TAch@main-cluster.iksp6ye.mongodb.net/?appName=Main-cluster";

const products = [
  {
    title: "M-SERIES 01",
    category: "Modern Workspaces",
    description: "Elevate your digital canvas. Our minimalist laptop stands are precision-engineered from aerospace-grade aluminum to provide the perfect ergonomic tilt while maintaining an invisible profile.",
    features: [],
    price: "FROM $149",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2Xlnc_5-09P9lOxu-RsLXY7jbspMHkdmTZ1m8rrrgi-hfyR07VPV3OSdZ6gdgycWrbqmiavtz8As7MXoLxVCD5gQJkeCBIE9FrF5PVagxFRSNGSIbbJ9ALTKkfFFirKhYmBLCGE-xzcLaxc7k3ORSsqeBiB7JeUcwhsHvdq8rCsm3-Wy-KXta01oe5irl3g4SxJvdGMPqnHTkmKSFkdXS_9fEpkJfY_LwCV9YNHgb1D-BF9LdN5P6OBLtIeiYdf4_EbwANegurRv",
    imageAlt: "Brushed silver aluminum laptop stand on a clean oak desk with a white monitor in the background, soft shadows"
  },
  {
    title: "Summer Expedition",
    category: "Seasonal Essential",
    description: "Luxury without limits. Our high-end portable refrigeration systems offer uncompromising cooling performance for the modern nomad. Encased in a powder-coated arctic white shell.",
    features: ["-20°C Deep Freeze Capacity", "Dual-Zone Temperature Control"],
    price: "",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEuMRxxouYC7wq2UkHhwAwLhDaSz8axQ2H6n3BnJqSyCQTov8vw-IuptnTRtK4THqheZkUIEQT7ecBo7hws61WDJTNG2Z_82DO2psQ1sdZu_v1Qx-6VJsrJTtvt8X_abg1hgFWCOVGJDsoRy5R53SAdpEOpyN0OWxD7oVTRwNwompGrmOnDma2BxWFr77FBy5Vv4fulNl49Hbb_hqFIn3I8h_wKGkR1qhv95O5V5DuePk_illcMskWXfT3SBCYRw8zSpjs0WYJL9rf",
    imageAlt: "A premium white portable fridge placed in a luxury coastal setting during sunset, light reflecting off sand"
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to DB. Seed starting...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products.');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
