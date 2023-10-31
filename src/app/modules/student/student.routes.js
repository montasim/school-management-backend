import express from "express";
import verifyJwt from "../../middlewares/verifyAuthenticationToken.js";
import { StudentValidators } from "./student.validator.js";
import { StudentController } from "./student.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a student.
 *     description: Endpoint to add a new student to the system.
 *     parameters:
 *       - in: body
 *         name: student
 *         description: The student to create.
 *         schema:
 *           $ref: '#/definitions/Student'
 *     responses:
 *       200:
 *         description: Student successfully created.
 */
router.post("/", [
    verifyJwt,
    StudentValidators.studentBodyValidator,
    StudentController.createStudentController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all students.
 *     description: Endpoint to retrieve a list of all students.
 *     responses:
 *       200:
 *         description: A list of students.
 */
router.get("/", [
    StudentController.getStudentListController
]);

/**
 * @swagger
 * /{studentId}:
 *   get:
 *     summary: Retrieve a specific student by ID.
 *     description: Endpoint to get details of a student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details.
 */
router.get("/:studentId", [
    StudentValidators.studentParamsValidator,
    StudentController.getAStudentController
]);

/**
 * @swagger
 * /{studentId}:
 *   put:
 *     summary: Update a student by ID.
 *     description: Endpoint to update the details of a student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: student
 *         description: Updated details of the student.
 *         schema:
 *           $ref: '#/definitions/Student'
 *     responses:
 *       200:
 *         description: Student successfully updated.
 */
router.put("/:studentId", [
    verifyJwt,
    StudentValidators.studentParamsValidator,
    StudentValidators.studentBodyValidator,
    StudentController.updateAStudentController
]);

/**
 * @swagger
 * /{studentId}:
 *   delete:
 *     summary: Delete a student by ID.
 *     description: Endpoint to delete a student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student successfully deleted.
 */
router.delete("/:studentId", [
    verifyJwt,
    StudentValidators.studentParamsValidator,
    StudentController.deleteAStudentController
]);

export default router;
