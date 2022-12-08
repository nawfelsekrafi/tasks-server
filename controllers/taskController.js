const asyncHandler = require("express-async-handler");
const { BadRequestError, NotFoundError } = require("../middlewares/apiError");
const {
  SuccessMsgResponse,
  SuccessResponse,
  SuccessMsgDataResponse,
  SuccessResponsePagination,
} = require("../middlewares/apiResponse");

const TaskRepo = require("../db/repositories/taskRepo");
const UserRepo = require("../db/repositories/userRepo");

exports.createTask = asyncHandler(async (req, res) => {
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
exports.getTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  if (
    !task.sharedWith.includes(req.user.id) &&
    task.user.toString() !== req.user.id
  ) {
    throw new BadRequestError("You can't get on this task");
  }
  return new SuccessResponse(task).send(res);
});
exports.shareMyTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    user: req.user,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }

  const checkUser = await UserRepo.findOneByObj({
    _id: { $eq: req.body.sharedWith },
  });
  if (!checkUser) {
    throw new NotFoundError("No user found with that id");
  }

  if (req.body.sharedWith === req.user.id) {
    throw new BadRequestError("You can't share a task with your self");
  }
  task.sharedWith.push(req.body.sharedWith);
  let sharedWith = task.sharedWith;
  let updatedTask = await TaskRepo.findByIdAndUpdate(task.id, { sharedWith });
  return new SuccessMsgDataResponse(
    updatedTask,
    "task shared successfully"
  ).send(res);
});
exports.unshareMyTask = asyncHandler(async (req, res) => {
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    user: req.user,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }
  const checkUser = await UserRepo.findOneByObj({
    _id: { $eq: req.body.sharedWith },
  });
  if (!checkUser) {
    throw new NotFoundError("No user found with that id");
  }
  if (!task.sharedWith.includes(req.body.sharedWith)) {
    throw new NotFoundError("No task with that id is shared with that user");
  }

  let sharedWith = task.sharedWith.filter(
    (el) => el.toString() !== req.body.sharedWith
  );
  let updatedTask = await TaskRepo.findByIdAndUpdate(task.id, { sharedWith });
  return new SuccessMsgDataResponse(
    updatedTask,
    "task unshared successfully"
  ).send(res);
});
exports.getTasksSharedToMe = asyncHandler(async (req, res) => {
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const tasks = await TaskRepo.findByObjPaginate(
    { sharedWith: req.user },
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
    user: req.user,
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
  const task = await TaskRepo.findOneByObj({
    _id: req.params.id,
    user: req.user,
    deletedAt: null,
  });
  if (!task) {
    throw new NotFoundError("No task found with that id");
  }

  let updatedTask = await TaskRepo.findByIdAndUpdate(task.id, req.body);

  return new SuccessMsgDataResponse(
    updatedTask,
    "task updated successfully"
  ).send(res);
});
