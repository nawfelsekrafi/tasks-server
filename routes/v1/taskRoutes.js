const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");
const authController = require("../../controllers/authController");
const {
  createTask,
  updateTask,
  getTasks,
  checkTaskId,
  shareTask,
  unshareTask,
} = require("./schemas/taskSchemas");
const { schemaValidator } = require("../../middlewares/schemaValidator");

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: The Task managing API
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Returns the list of all the tasks
 *     tags: [Task]
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *        - in: query
 *          name: deleted
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: The list of the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.get(
  "/",
  authController.protect,
  schemaValidator(getTasks, "query"),
  taskController.getMyTasks
);

/**
 * @swagger
 * /tasks/shared/me:
 *   get:
 *     summary: Returns the list of tasks Shared To Me
 *     tags: [Task]
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *            type: string
 *        - in: query
 *          name: title
 *          schema:
 *            type: string
 *        - in: query
 *          name: status
 *          schema:
 *            type: string
 *        - in: query
 *          name: deleted
 *          schema:
 *            type: string
 *        - in: query
 *          name: sort
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *     responses:
 *       200:
 *         description: The list of the tasks Shared to me
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.get(
  "/shared/me",
  authController.protect,
  schemaValidator(getTasks, "query"),
  taskController.getTasksSharedToMe
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: task Creation
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CreateTask'
 *     tags: [Task]
 *     responses:
 *       200:
 *         description: Task creation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 *
 */

router.post(
  "/",
  authController.protect,
  schemaValidator(createTask),
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router
  .route("/:id")
  .get(
    authController.protect,
    schemaValidator(checkTaskId, "params"),
    taskController.getTask
  );

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: update one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.put(
  "/:id",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  schemaValidator(updateTask),
  taskController.updateTask
);
/**
 * @swagger
 * /tasks/{id}/share:
 *   put:
 *     summary: share one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ShareTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.put(
  "/:id/share",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  schemaValidator(shareTask),
  taskController.shareMyTask
);
/**
 * @swagger
 * /tasks/{id}/unshare:
 *   put:
 *     summary: unshare one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ShareTask'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.put(
  "/:id/unshare",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  schemaValidator(unshareTask),
  taskController.unshareMyTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: delete one task by id
 *     tags: [Task]
 *     parameters:
 *      - in: path
 *        name: id
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Task'
 *     security:
 *      - bearerAuth: []
 */

router.delete(
  "/:id",
  authController.protect,
  schemaValidator(checkTaskId, "params"),
  taskController.deleteTask
);

module.exports = router;
