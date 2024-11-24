import { taskService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

const createTaskHandler = async (req, res) => {
  const { title, description } = req.body;
  const userUuid = req.user.uuid;
  const task = await taskService.createTask({
    title,
    description,
    userUuid,
  });
  res.status(httpStatus.CREATED).json({ task });
};

const getTasksHandler = async (req, res) => {
  const tasks = await taskService.getTasks(req.user.uuid);
  res.status(httpStatus.OK).json({ tasks });
};

const deleteTaskHandler = async (req, res) => {
  const taskUuid = req.params.uuid;
  const userUuid = req.user.uuid;

  await taskService.deleteTask(taskUuid, userUuid);
  res.status(200).json({ message: "Task deleted successfully" });
};

const completeTaskHandler = async (req, res) => {
  const taskUuid = req.params.uuid;
  const userUuid = req.user.uuid;
  const { isCompleted } = req.body;

  const task = await taskService.completeTask(taskUuid, userUuid, isCompleted);
  res.status(200).json({ message: "Task updated successfully", task });
};

export const createTask = errorHandlerWrapper(createTaskHandler);
export const getTasks = errorHandlerWrapper(getTasksHandler);
export const deleteTask = errorHandlerWrapper(deleteTaskHandler);
export const completeTask = errorHandlerWrapper(completeTaskHandler);
