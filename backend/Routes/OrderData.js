const express = require('express')
const Router = express.Router()
const Order = require ('../models/Orders')

Router.post("/orderData", async (req, res)=> {
    let data = req.body.order_data
    await data.splice(0, 0, {Order_date: req.body.order_date})
    let eId = await Order.findOne({'email': req.body.email})
    console.log(eId)
    if (eId === null){
        try {
            await Order.create({
                email: req.body.email,
                order_data : [data]
            }).then(()=>{
                res.json({ success : true })
            })
        } catch (error) {
            console.log(error.massage)
            res.send("Server Error", error.massage)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email: req.body.email},
            { $push: { order_data: data }}).then(()=>{
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.massage);
            res.send("Server Error", error.massage)
        }
    }
})

Router.post('/myOrderData', async(req, res)=>{
    try {
        let myData = await Order.findOne({'email' : req.body.email})
        res.json({orderData : myData})
    } catch (error) {
        res.send("Server Error", error.massage)
    }
});

module.exports = Router;