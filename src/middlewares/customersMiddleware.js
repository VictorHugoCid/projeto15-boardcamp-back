import { connection } from "../database/db.js";
import joi from 'joi';
import customerSchema from '../schemas/customersSchemas.js'


async function customerMiddleware(req, res, next) {
    const { cpf } = req.body;

    const validation = customerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(value => value.message);
        return res.status(400).send(errors)
    }

    const customer = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

    if (customer.rows[0]) {
        return res.status(409).send('Esse cpf já está cadastrado')
    }

    next();
}

async function updateCustomerMiddleware(req, res, next) {
    const { cpf } = req.body;

    const validation = customerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(value => value.message);
        return res.status(400).send(errors)
    }

    const customer = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

    if (customer.rows[0] && name.toLowerCase() !== customer.rows[0].name.toLowerCase()) {
        return res.status(409).send('Esse cpf já está sendo utilizado')
    }

    next();
}

export {
    customerMiddleware,
    updateCustomerMiddleware,
}