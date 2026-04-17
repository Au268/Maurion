const Product = require('../models/Product');


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(products){
        res.json({
            status:"Success",
            data:products
        });
    }
    else{
        res.json({
            status:"Failure"
        })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not fetch products', error: error.message });
  }
};


const getProductById = async(req,res)=>{
    try {
        const id = req.body;
        const product = await Product.findById(id);
        if(product){
        res.json({
            status:"Success",
            data:product
        });
    }
    else{
        res.json({
            status:"Failure"
        })
    }
        
    } catch (error) {
        res.status(500).json({message: 'Server Error: Could not fetch products', error: error.message})
    }
}

module.exports = { getAllProducts,getProductById};