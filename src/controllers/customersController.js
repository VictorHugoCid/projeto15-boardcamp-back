import express from 'express';
import { connection } from '../database/db.js';
import dayjs from 'dayjs'

async function listCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf) {
            const customers = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`)

            return res.send(customers.rows)
        }
        const customers = await connection.query('SELECT * FROM customers')

        res.send(customers.rows)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getCustomerById(req, res) {
    const { id } = req.params;
    console.log('passou by Id')

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id])

        if (!customer.rows[0]) {
            return res.sendStatus(404)
        }

        res.status(200).send(customer.rows[0])

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function createCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    // ver como q chega a data

    try {

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])

        res.status(201).send(req.body)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params

    try {
        // validate cpf !==
        const customer = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

        if (customer.rows[0] && name.toLowerCase() !== customer.rows[0].name.toLowerCase()) {
            return res.status(409).send('Esse cpf já está sendo utilizado')
        }

        await connection.query(`UPDATE customers SET 
           name = $1,
           phone = $2,
           cpf = $3,
           birthday = $4
           WHERE id = $5`, [name, phone, cpf, birthday, id])
        res.send(customer.rows[0])

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {
    listCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer
}