    const express = require('express');
    const router  = express.Router();


    const {saveOrder,getOrders,updateOrderStatus} = require("../controllers/orderController");

    router.post('/',saveOrder)
    router.get("/get",getOrders)
    router.patch("/:id",updateOrderStatus)


    module.exports = router;