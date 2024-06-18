const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const User = require("../models/user");
const { validateFields } = require('../utils/validation');

//RequestBody Validation MiddleWare
const requestBodyValidationMiddleware = (req, resp, next) => {
    const data = req.body;
    const user = new User(data.email, data.password);
    const validationResp = validateFields(user);
    if (validationResp.length) {
        resp.status(400).json({ errors: validationResp });
    } else {
        next();
    }
}

//Registraion Route
userRouter.post("/register", requestBodyValidationMiddleware, async (req, resp) => {
    try {
        const { email, password } = req.body;
        const newUser = await userController.registerUser(email, password);
        resp.status(201).json(newUser);
    } catch (error) {
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

//Login Route
userRouter.post("/login", requestBodyValidationMiddleware, async (req, resp) => {
    try {
        const { email, password } = req.body;
        const newUser = await userController.loginUser(email, password);
        resp.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

module.exports = userRouter;