import { Router } from "express";
import { TaskValidator } from "../validators";
import { TaskController } from "../controllers";
import { checkAuth } from "../utils";

export const taskRouter = Router();

taskRouter.use(checkAuth);

taskRouter.post(
  "/",
  TaskValidator.createTaskValidator(),
  TaskController.createTask
);
taskRouter.get("/", TaskController.getTasks);
taskRouter.delete("/:uuid", TaskController.deleteTask);
taskRouter.patch("/:uuid/complete", TaskController.completeTask);
