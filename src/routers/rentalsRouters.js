import express from 'express';
import * as rentalsController from '.././controllers/rentalsController.js'

const router = express.Router();

router.get('/rentals', rentalsController.listRentals)
router.post('/rentals', rentalsController.insertRent)
router.post('/rentals/:id/return', rentalsController.finalizeRent)
router.delete('/rentals/:id', rentalsController.deleteRent)

export default router;