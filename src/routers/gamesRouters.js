import express from 'express';
import * as gamesController from '.././controllers/gamesController.js'
// import userAlreadyExist from '../middlewares/singUpMiddleware.js'
// import logInValidate from '../middlewares/logInMiddleware.js'
// import validateSession from '../middlewares/sessionMiddleware.js';
const router = express.Router();

router.get('/games', gamesController.listGames)
router.post('/games', gamesController.insertGame)

export default router;