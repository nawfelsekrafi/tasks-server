const Joi = require("joi");
const { JoiObjectId } = require("../../../middlewares/schemaValidator");
/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title
 *         description:
 *           type: string
 *           description: the description
 *         status:
 *           type: string
 *           description: task status todo or in progress or completed
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: The title
 *         description:
 *           type: string
 *           description: the description
 *         status:
 *           type: string
 *           description: task status todo or in progress or completed
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title
 *         description:
 *           type: string
 *           description: the description
 *         status:
 *           type: string
 *           description: task status todo or in progress or completed
 *     ShareTask:
 *       type: object
 *       properties:
 *         sharedWith:
 *           type: [string]
 *           description: id of user/users to share the task with
 */

exports.getTasks = Joi.object({
  title: Joi.string().trim().min(3).max(30).optional(),
  description: Joi.string().trim().min(3).max(1000).optional(),
  status: Joi.string().trim().min(3).max(20).optional(),
  deleted: Joi.boolean().optional(),
  page: Joi.number().optional(),
  perPage: Joi.number().optional(),
  search: Joi.string().optional(),
  sort: Joi.string().optional(),
});

exports.createTask = Joi.object({
  title: Joi.string().trim().min(3).max(30).required(),
  description: Joi.string().trim().min(3).max(1000).required(),
  status: Joi.string().trim().min(3).max(20).required(),
});

exports.updateTask = Joi.object({
  title: Joi.string().trim().min(3).max(30).optional(),
  description: Joi.string().trim().min(3).max(1000).optional(),
  status: Joi.string().trim().min(3).max(20).optional(),
});
exports.shareTask = Joi.object({
  sharedWith: JoiObjectId().min(1).required(),
});
exports.unshareTask = Joi.object({
  sharedWith: JoiObjectId().min(1).required(),
});

exports.checkTaskId = Joi.object({
  id: JoiObjectId().required(),
});
