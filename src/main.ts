import bodyParser from "body-parser";
import express from "express";
import { Request, Response } from "express";
import http from "http";
import * as requestHandler from "./request_handler";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/employees", (req: Request, res: Response) => {
    handleRequest(res, () => requestHandler.getAllEmployees());
});

app.post("/api/v1/employees", (req: Request, res: Response) => {
    handleRequest(res, () => requestHandler.addNewEmployee(req.body));
});

app.get("/api/v1/employees/:id", (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getEmployeeInfo(employeeId));
});

app.get("/api/v1/managers", (req: Request, res: Response) => {
    handleRequest(res, () => requestHandler.getAllManagers());
});

app.post("/api/v1/managers", (req: Request, res: Response) => {
    handleRequest(res, () => requestHandler.addNewManager(req.body));
});

app.get("/api/v1/managers/:id", (req: Request, res: Response) => {
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getManagerInfo(managerId));
});

app.get("/api/v1/managers/:id/team", (req: Request, res: Response) => {
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.getManagerTeam(managerId));
});

app.post("/api/v1/managers/:id/team", (req: Request, res: Response) => {
    const employeeId = Number(req.body.employee_id);
    const managerId = Number(req.params.id);
    handleRequest(res, () => requestHandler.addEmployeeToManagerTeam(employeeId, managerId));
});

function handleRequest(response: any, handler: () => void) {
    let result = null;
    try {
        result = handler();
    } catch (error) {
        result = error.toString();
    }
    response.send(result);
}

console.log("starting server...");
http.createServer(app).listen(3000);
