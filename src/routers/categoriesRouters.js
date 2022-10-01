import express from 'express';
import * as categoriesController from '.././controllers/categoriesController.js'


// import userAlreadyExist from '../middlewares/singUpMiddleware.js'

const router = express.Router();

router.get('/categories', categoriesController.listCategories)
router.post('/categories', categoriesController.createCategorie)

export default router;