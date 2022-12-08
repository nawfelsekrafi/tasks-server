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
 *     Comment:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The comment content
 */
