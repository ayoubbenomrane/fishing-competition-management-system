const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/joueurController.js');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/assets/profile_pictures'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
  
  const upload = multer({ storage: storage });
// CRUD routes for joueur


/**
 * @swagger
 * components:
 *  schemas:
 *      Joueur:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto generated Id of the player
 *              name:
 *                  type: string
 *                  description: name of the player
 *              phone_number:
 *                  type: string
 *                  description: the phone number of the player
 *              total_score:
 *                  type: integer
 *                  description: the total score of all the journees
 *              final_ranking:
 *                  type: integer 
 *                  description: overall ranking of the player
 */



/**
 * @swagger
 * /joueur:
 *  post:
 *      summary: create new player
 *      tags: [Joueur]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          phone_number:
 *                              type: string
 * 
 *      
 * 
 */
router.post('',upload.single('profile_picture'), (req,res,next)=>{
  console.log(req.file);
  console.log("fgfgg")
  if (!req.file) {
    console.log("ya hliiiliii")
  }
  next();
},joueurController.createJoueur); // Create

/**
 * @swagger
 * /joueur:
 *  get:
 *      summary: Retrieve all players
 *      tags: [Joueur]
 *      responses:
 *          200:
 *              description: list of all players
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: #/compenents/schemas/Joueur
 */
router.get('', joueurController.getAllJoueurs); // Read All

/**
 * @swagger
 * /joueur/{id}:
 *  get:
 *      summary: get a player by id
 *      tags: [Joueur]
 * 
 */
router.get('/:id', joueurController.getJoueurById); // Read One


/**
 * @swagger
 * /joueur/{id}:
 *  put:
 *      summary: upadte player by id
 *      tags: [Joueur]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Joueur'
 * 
 */

router.put('/:id', joueurController.updateJoueur); // Update
/**
 * @swagger
 * /joueur/{id}:
 *  delete:
 *      summary: delete player by id
 *      tags: [Joueur]
 * 
 */

router.delete('/:id', joueurController.deleteJoueur); // Delete




// router.post('/profile',upload.single('avatar'),function(req,res){
    
//     res.json(req.file)
//     console.log("bitch");
     
// })



module.exports = router;
