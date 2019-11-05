const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const requestHandler = require("./request_handler");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const STATUS_CODE_404 = 404;
const STATUS_CODE_200 = 200;

//1
app.get('/api/v1/employees',(req, res) => {
    res.send(requestHandler.getAllEmployees().toString());
});

//2
app.post('/api/v1/employees', (req, res) => {
    let result = null;
    try {
        result = requestHandler.addNewEmployee(req.body);
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

//3
app.get('/api/v1/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    let result = null;
    try {
        result = requestHandler.getEmployeeInfo(employeeId);
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

//4
app.get('/api/v1/managers', (req, res) => {
    res.send(requestHandler.getAllManagers().toString());
});

//5
app.post('/api/v1/managers', (req, res) => {
    let result = null;
    try {
        result = requestHandler.addNewManager(req.body);
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

app.get('/api/v1/managers/:id', (req, res) => {
    const managerId = req.params.id;
    let result = null;
    try {
        result = requestHandler.getManagerInfo(managerId);
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

app.get('/api/v1/managers/:id/team', (req, res) => {
    const managerId = req.params.id;
    let result = null;
    try {
        result = requestHandler.getManagerTeam(managerId).toString();
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

app.post('/api/v1/managers/:id/team', (req, res) => {
    const employeeId = Number(req.body.employee_id);
    const managerId = Number(req.params.id);
    let result = null;
    try {
        result = requestHandler.addEmployeeToManagerTeam(employeeId, managerId).toString();
    }
    catch (error) {
        res.status(STATUS_CODE_404);
        result = error;
    }
    res.send(result);
});

http.createServer(app).listen(3000);
