import express from 'express';
import * as rentalsController from '.././controllers/rentalsController.js'
import { rentalMiddleware } from '../middlewares/rentalsMiddleware.js'
const router = express.Router();

router.get('/rentals', rentalsController.listRentals)
router.post('/rentals', rentalMiddleware, rentalsController.insertRent)
router.post('/rentals/:id/return', rentalsController.finalizeRent)
router.delete('/rentals/:id', rentalsController.deleteRent)

export default router;