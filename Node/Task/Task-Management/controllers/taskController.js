const Task = require("../models/task");
const { connection, TASKS_TABLE_NAME } = require('../configuration/db-connection');
require('dotenv').config();

//Create new Task
const createTask = (data) => {
    let newTask = new Task(data.title, data.description, data.status, data.dueDate, process.env.loggedInUserId, new Date().toISOString().split('T')[0]);
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO ?? SET ?", [TASKS_TABLE_NAME, newTask], (error, results, fields) => {
            if (results && results.affectedRows) {
                newTask.id = results.insertId;
                resolve(newTask);
            } else {
                reject({ errors: `${error.message}` });
            }
        });
    })
}

//Get All Tasks
const getAllTask = () => {
    return new Promise((resolve, reject) => {
        // console.log("getAllTask ", process.env.loggedInUserId);
        connection.query(`SELECT id, title, description, status, DATE_FORMAT(dueDate, "%d-%m-%Y") as dueDate,  createdby, DATE_FORMAT(createdDate, '%Y-%m-%d') as createdDate FROM ?? `, TASKS_TABLE_NAME, (error, results, fields) => {
            if (results.length) {
                resolve(results);
            } else {
                reject({ errors: `${error ? error : 'No Tasks yet!'}` });
            }
        });
    })
}

//Get All Tasks with Pagination
const getAllTaskWithPagination = (page = 1, limit = 5, sortBy = "status", isSortAsc = false, searchKey) => {
    let offset = ((page - 1) * limit);
    const queryString = `SELECT id, title, description, status, DATE_FORMAT(dueDate, '%Y-%m-%d') as dueDate, createdby, DATE_FORMAT(createdDate, '%Y-%m-%d') as createdDate 
                            FROM ?? 
                            ${!!searchKey ? `WHERE title LIKE '%${searchKey}%' OR status LIKE '%${searchKey}%' OR description LIKE '%${searchKey}%'` : ''}
                            ORDER BY ${sortBy} ${isSortAsc ? 'asc' : 'desc'} ${sortBy != 'dueDate' ? ', dueDate desc' : ''} 
                            LIMIT ${limit} OFFSET ${offset}`;
    // console.log(queryString);
    return new Promise((resolve, reject) => {
        connection.query(queryString, [TASKS_TABLE_NAME], (error, results, fields) => {
            // console.table(results);
            if (results && results.length) {
                resolve(results);
            } else {
                reject({ errors: `${error ? error : 'No Tasks yet!'}` });
            }
        });
    })
}

//Gets Task by Id
const getTaskById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT id, title, description, status, DATE_FORMAT(dueDate, "%Y-%m-%d") as dueDate, createdby, DATE_FORMAT(createdDate, '%Y-%m-%d') as createdDate FROM ?? WHERE id = ? `, [TASKS_TABLE_NAME, id], (error, results, fields) => {
            if (results.length) {
                resolve(results);
            } else {
                reject({ errors: `${error ? error : `Task with id ${id} not found`}` });
            }
        });
    })
}


//Checks if Task with taskId is present then deletes respective task & returns deleted task details
const deleteTask = async (taskId) => {
    const existingTask = await getTaskById(taskId);
    if (existingTask.length) {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM ?? WHERE id = ? `, [TASKS_TABLE_NAME, taskId], (error, results, fields) => {
                // console.log("controller delete ", results);
                if (results && results.affectedRows) {
                    resolve(existingTask);
                } else {
                    reject({ errors: `${error ? error : `Task with id ${taskId} not found`}` });
                }
            });
        })
    }
}

//Checks if Task with taskId is present then updates respective task & returns updated task details
const updateTask = async (data, taskId) => {
    const existingTask = await getTaskById(taskId);
    if (existingTask.length) {
        const taskDetails = new Task(data.title, data.description, data.status, data.dueDate, existingTask[0].createdby, existingTask[0].createdDate, taskId);
        return updateTaskDetails(taskDetails, taskId);
    }
}

//updates task with taskDetails for provided taskId
const updateTaskDetails = async (taskDetails, taskId) => {
    return new Promise((resolve, reject) => {
        connection.query("UPDATE ?? SET ? WHERE id = ?", [TASKS_TABLE_NAME, taskDetails, taskId], (error, results, fields) => {
            if (results && results.affectedRows) {
                resolve(taskDetails);
            } else {
                reject({ errors: `${error.message}` });
            }
        });
    })
}

module.exports = { createTask, getAllTask, getTaskById, updateTask, deleteTask, getAllTaskWithPagination }


