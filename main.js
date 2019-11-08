const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const requestHandler = require("./request_handler");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/employees',(req, res) => {
    handleRequest(res, () => requestHandler.getAllEmployees());
});

app.post('/api/v1/employees', (req, res) => {
    handleRequest(res, () => requestHandler.addNewEmployee(req.body));
});

app.get('/api/v1/employees/:id', (req, res) => {
    const employeeId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getEmployeeInfo(employeeId));
});

app.get('/api/v1/managers', (req, res) => {
    handleRequest(res, () => requestHandler.getAllManagers());
});

app.post('/api/v1/managers', (req, res) => {
    handleRequest(res, () => requestHandler.addNewManager(req.body));
});

app.get('/api/v1/managers/:id', (req, res) => {
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getManagerInfo(managerId));
});

app.get('/api/v1/managers/:id/team', (req, res) => {
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getManagerTeam(managerId));
});

app.post('/api/v1/managers/:id/team', (req, res) => {
    const employeeId = Number(req.body.employee_id);
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.addEmployeeToManagerTeam(employeeId, managerId));
});

function handleRequest(response, handler) {
    let result = null;
    try {
        result = handler();
    }
    catch (error) {
        result = error.toString();
    }
    response.send(result);
}

http.createServer(app).listen(3000);
