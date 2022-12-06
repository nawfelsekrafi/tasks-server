const asyncHandler = require("express-async-handler");
const { BadRequestError, NotFoundError } = require("../middlewares/apiError");
const {
  SuccessMsgResponse,
  SuccessResponse,
  SuccessMsgDataResponse,
  SuccessResponsePagination,
} = require("../middlewares/apiResponse");

const TaskRepo = require("../db/repositories/taskRepo");

exports.getTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  return new SuccessResponse(task).send(res);
});
exports.createTask = asyncHandler(async (req, res) => {
  console.log(req.user);

  let task = await TaskRepo.create({ user: req.user.id, ...req.body });

  return new SuccessMsgDataResponse(task, "Task created successfully").send(
    res
  );
});
exports.getMyTasks = asyncHandler(async (req, res) => {
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const tasks = await TaskRepo.findByObjPaginate(
    { user: req.user },
    options,
    req.query
  );
  if (!tasks) {
    return new SuccessMsgResponse("No tasks found").send(res);
  }
  const { docs, ...meta } = tasks;

  return new SuccessResponsePagination(docs, meta).send(res);
});
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("Task not found");
  }
  let deletedTask = await TaskRepo.deleteTask(task);
  return new SuccessMsgDataResponse(
    deletedTask,
    "Task deleted successfully"
  ).send(res);
});
exports.updateTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findByIdAndUpdate(req.params.id, req.body);
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  return new SuccessMsgDataResponse(task, "task updated successfully").send(
    res
  );
});
