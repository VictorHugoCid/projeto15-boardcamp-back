import express from 'express';
import * as categoriesController from '.././controllers/categoriesController.js'
import { categorieMiddleware } from '../middlewares/categoriesMiddleware.js'

const router = express.Router();

router.get('/categories', categoriesController.listCategories)
router.post('/categories', categorieMiddleware, categoriesController.createCategorie)

export default router;