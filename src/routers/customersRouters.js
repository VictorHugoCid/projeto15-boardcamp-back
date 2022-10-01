import express from 'express';
import * as customersController from '.././controllers/customersController.js'

const router = express.Router();

router.get('/customers', customersController.listCustomers)
router.get('/customers/:id', customersController.getCustomerById)
router.post('/customers', customersController.createCustomer)
router.put('/customers/:id', customersController.updateCustomer)

export default router;