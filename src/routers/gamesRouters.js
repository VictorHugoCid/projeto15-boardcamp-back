import express from 'express';
import * as gamesController from '.././controllers/gamesController.js'
import { gamesMiddleware } from '../middlewares/gamesMiddleware.js';

const router = express.Router();

router.get('/games', gamesController.listGames)
router.post('/games', gamesMiddleware, gamesController.insertGame)

export default router;