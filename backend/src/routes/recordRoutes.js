const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// CRUD routes for record
/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       required:
 *         - journee_id
 *         - joueur_id
 *         - fish_count
 *         - total_weight
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the record
 *         journee_id:
 *           type: integer
 *           description: The ID of the associated journée
 *         joueur_id:
 *           type: integer
 *           description: The ID of the associated joueur
 *         fish_count:
 *           type: integer
 *           description: The number of fish caught by the joueur
 *         total_weight:
 *           type: number
 *           format: float
 *           description: The total weight of the fish caught by the joueur
 *         score:
 *           type: integer
 *           description: The calculated score for the record
 *         ranking:
 *           type: integer
 *           description: The ranking of the joueur in that journée
 *         absent:
 *           type: boolean
 *           description: Indicates if the joueur was absent
 */

/**
 * @swagger
 * /record:
 *   get:
 *     summary: Retrieve all records
 *     tags: [Record]
 *     responses:
 *       200:
 *         description: A list of records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Record'
 */
router.get('/', recordController.getAllRecords);

/**
 * @swagger
 * /record/{id}:
 *   get:
 *     summary: Retrieve a single record by ID
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the record
 *     responses:
 *       200:
 *         description: The record data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       404:
 *         description: Record not found
 */
router.get('/:id', recordController.getRecordById);

/**
 * @swagger
 * /record:
 *   post:
 *     summary: Create a new record
 *     tags: [Record]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       201:
 *         description: Record created successfully
 *       500:
 *         description: Failed to create record
 */
router.post('/', recordController.createRecord);

/**
 * @swagger
 * /record/{id}:
 *   put:
 *     summary: Update a record by ID
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Record'
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       404:
 *         description: Record not found
 */
router.put('/:id', recordController.updateRecord);

/**
 * @swagger
 * /record/{id}:
 *   delete:
 *     summary: Delete a record by ID
 *     tags: [Record]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the record
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 */
router.delete('/:id', recordController.deleteRecord);

module.exports = router;


