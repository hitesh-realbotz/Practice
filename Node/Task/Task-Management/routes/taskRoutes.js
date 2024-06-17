const express = require('express');
const router = express.Router();
const Task = require("../models/task");
const taskController = require("../controllers/taskController");
const { validateFields } = require('../utils/validation');
const authenticationMiddleware = require('../authenticationMiddleware');

//RequestBody Validation MiddleWare
const inputValidationMiddleware = (req, resp, next) => {
    const data = req.body;
    const newTask = new Task(data.title, data.description, data.status, data.dueDate, data.id);
    const { id, ...taskWithoutId } = newTask;
    const validationResp = validateFields(taskWithoutId);
    if (validationResp.length) {
        resp.send({ errors: validationResp });
    } else {
        next();
    }
}

//Add Task Route
router.post("/tasks", authenticationMiddleware, inputValidationMiddleware, async (req, resp) => {
    try {
        let newTask = await taskController.createTask(req.body);
        resp.status(201).json(newTask);
    } catch (error) {
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

//Update Task Route
router.put("/tasks/:id", authenticationMiddleware, inputValidationMiddleware, async (req, resp) => {
    try {
        let updatedTask = await taskController.updateTask(req.body, req.params.id);
        resp.status(200).json(updatedTask);
    } catch (error) {
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

// //GetAll Task Route
// router.get("/tasks", async (req, resp) => {
//     try {
//         const allTasks = await taskController.getAllTask();
//         resp.status(200).json(allTasks);
//     } catch (error) {
//         if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
//         else resp.status(500).json({ error: `Something went wrong` });
//     }
// });

//GetAll Task Route with pagination
router.get("/tasks", async (req, resp) => {
    try {
        const {page, limit} = req.query;
        const allTasks = await taskController.getAllTaskWithPagination(page, limit);
        resp.status(200).json(allTasks);
    } catch (error) {
        console.log("getAllTaskWithPagination error ", error);
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

//Get Task by Id Route
router.get("/tasks/:id", async (req, resp) => {
    try {
        task = await taskController.getTaskById(req.params.id);
        resp.status(200).json(task);
    } catch (error) {
        console.error("Error :", error);
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

//Delete Task by Id Route
router.delete("/tasks/:id", authenticationMiddleware, async (req, resp) => {
    try {
        task = await taskController.deleteTask(req.params.id);
        resp.status(200).json(task);
    } catch (error) {
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});


//Generate Random Task Route
router.post("/genearetRandomTasks", async (req, resp) => {
    try {
        const taskStatus = ["pending", "in-progress", "completed"];
        const minYear = 2024;
        const tasks = [];
        for (let i = 1; i <= 100; i++) {
            let statusToBe = taskStatus[Math.floor(Math.random() * taskStatus.length)];
            let dueDate = statusToBe === taskStatus[2]
                            ? `${minYear - Math.floor(Math.random() * 25)}-${Math.floor(Math.random() * 11) + 1}-${Math.floor(Math.random() * 25) + 1}`
                            : `${Math.floor(Math.random() * 25) + minYear}-${Math.floor(Math.random() * 11) + 1}-${Math.floor(Math.random() * 25) + 1}`;
            tasks.push(new Task(
                `Task-${i}`,
                `This is description for Task-${i}.`,
                statusToBe,
                dueDate
            )
            )
        }
        for (let i = 0; i < tasks.length; i++) {
            const task = await taskController.createTask(tasks[i]);
        }
        const allTasks = await taskController.getAllTask();
        resp.status(200).json(allTasks);
    } catch (error) {
        console.error("Error :", error);
        if (!!error.errors) return resp.status(400).json({ error: `${error.errors}` });
        else resp.status(500).json({ error: `Something went wrong` });
    }
});

module.exports = router;