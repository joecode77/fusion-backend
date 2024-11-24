import { AppDataSouce } from "../db";
import { TaskEntity } from "../entities";

export const createTask = async (data) => {
  const taskRepository = AppDataSouce.getRepository(TaskEntity);
  const task = taskRepository.create(data);
  await taskRepository.save(task);
  return task;
};

export const getTasks = async (uuid) => {
  const taskRepository = AppDataSouce.getRepository(TaskEntity);
  return await taskRepository.find({ where: { user: { uuid: uuid } } });
};

export const deleteTask = async (taskUuid: string, userUuid: string) => {
  const taskRepository = AppDataSouce.getRepository(TaskEntity);

  const task = await taskRepository.findOne({
    where: { uuid: taskUuid, userUuid },
  });
  if (!task) {
    throw new Error("Task not found or not authorized to delete");
  }

  await taskRepository.remove(task);
  return task;
};

export const completeTask = async (
  taskUuid: string,
  userUuid: string,
  isCompleted: boolean
) => {
  const taskRepository = AppDataSouce.getRepository(TaskEntity);

  const task = await taskRepository.findOne({
    where: { uuid: taskUuid, userUuid },
  });
  if (!task) {
    throw new Error("Task not found or not authorized to update");
  }

  task.isCompleted = isCompleted;
  await taskRepository.save(task);

  return task;
};
