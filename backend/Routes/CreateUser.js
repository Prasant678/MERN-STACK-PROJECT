const express = require('express')
const Router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const jwtsecret = "MynameisGPrasantraoqwertyuiopa$#";
const bcrypt = require('bcryptjs');
Router.post("/CreateUser", [
    body('email').isEmail({}),
    body('name').isLength({ min: 6 }),
    body('password', 'Incorrect Password').isLength({ min: 6 })],
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            (res.json({ success: true }))

        } catch (error) {
            console.log(error)
                (res.json({ success: false }))
        }
    })

Router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 6 })],
    async (req, res) => {

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({email});
            if(!userData) {
                return res.status(400).json({ error: "Incorrect EmailAddress"})
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if(!pwdCompare){
                return res.status(400).json({ error: "Incorrect Password"}) 
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtsecret)
        return res.json({ success:true,authToken:authToken });
        } 
        catch (error) {
            console.log(error)
                (res.json({ success: false }));
        }
})

module.exports = Router;