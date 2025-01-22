const express = require('express');
const router = express.Router();
const journeeController = require('../controllers/journeeController');

// CRUD routes for journee



/**
 * @swagger
 * components:
 *   schemas:
 *     Journee:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - place
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the journée
 *         name:
 *           type: string
 *           description: The name of the journée
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the journée
 *         place:
 *           type: string
 *           description: The location of the journée
 *         duration:
 *           type: string
 *           format: time
 *           description: The duration of the journée
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the journée was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the journée was last updated
 *       example:
 *         id: 1
 *         name: "Day 1"
 *         date: "2025-02-17"
 *         place: "Lakeview"
 *         duration: "05:00:00"
 */

/**
 * @swagger
 * /journee:
 *   get:
 *     summary: Retrieve all journées
 *     tags: [Journee]
 *     responses:
 *       200:
 *         description: A list of journées
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journee'
 */
router.get('/', journeeController.getAllJournees);

/**
 * @swagger
 * /journee/{id}:
 *   get:
 *     summary: Retrieve a single journée by ID
 *     tags: [Journee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the journée
 *     responses:
 *       200:
 *         description: The journée data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journee'
 *       404:
 *         description: Journée not found
 */
router.get('/:id', journeeController.getJourneeById);

/**
 * @swagger
 * /journee:
 *   post:
 *     summary: Create a new journée
 *     tags: [Journee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journee'
 *     responses:
 *       201:
 *         description: Journée created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journee'
 *       500:
 *         description: Server error
 */
router.post('/', journeeController.createJournee);

/**
 * @swagger
 * /journee/{id}:
 *   put:
 *     summary: Update a journée by ID
 *     tags: [Journee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the journée
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journee'
 *     responses:
 *       200:
 *         description: Journée updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journee'
 *       404:
 *         description: Journée not found
 */
router.put('/:id', journeeController.updateJournee);

/**
 * @swagger
 * /journee/{id}:
 *   delete:
 *     summary: Delete a journée by ID
 *     tags: [Journee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the journée
 *     responses:
 *       200:
 *         description: Journée deleted successfully
 *       404:
 *         description: Journée not found
 */
router.delete('/:id', journeeController.deleteJournee);

module.exports = router;
