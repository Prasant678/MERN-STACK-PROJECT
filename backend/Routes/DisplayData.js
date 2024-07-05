const express = require('express')
const Router = express.Router()

Router.post("/foodData" , (req,res) =>{
    try {
        res.send([global.food_items,global.foodCategory])
    } catch (error) {
        console.error(error.massage);
        res.send("Server Error")
    }
    
})

module.exports = Router;