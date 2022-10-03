import express from 'express';
import * as customersController from '.././controllers/customersController.js'
import { customerMiddleware, updateCustomerMiddleware } from '../middlewares/customersMiddleware.js';

const router = express.Router();

router.get('/customers', customersController.listCustomers)
router.get('/customers/:id', customersController.getCustomerById)
router.post('/customers', customerMiddleware, customersController.createCustomer)
router.put('/customers/:id', updateCustomerMiddleware, customersController.updateCustomer)

export default router;