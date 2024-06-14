const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/register", async (req, resp) => {
    try {
        const { email, password } = req.body;
        const newUser = await userController.registerUser(email, password);
        console.log("newUser =>", newUser);
        resp.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        if(!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});
router.post("/login", async (req, resp) => {
    try {
        const { email, password } = req.body;
        const newUser = await userController.loginUser(email, password);
        console.log("newUser =>", newUser);
        resp.status(200).json(newUser);
    } catch (error) {
        console.error("Error while login :", error);
        if(!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});


module.exports = router;