import express from 'express';
import { connection } from '../database/db.js';
import dayjs from 'dayjs'

async function listCustomers(req, res){

    try {
        const customers = await connection.query('SELECT * FROM customers')

        res.send(customers.rows)
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function getCustomerById(req, res){
    const id = req.params.id;

    try {
        const customer = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id])
        request.send(customer.rows[0])
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function createCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body;
    // ver como q chega a data
    let data = dayjs('1900-01-15').format('DD/MM/YYYY')
    console.log(data)

    try {
        // validate cpd min 11 caract
        // phone string com min de 10 ou 11 caract numéricos
        // name !== vazio
        // birthday deve ser uma data válida

        // cpf tem q ser !== de um já cadastrado

        // await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])

        res.status(201).send(req.body)
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function updateCustomer(req, res){
    const {name, phone, cpf, birthday} = req.body


    try {
        const id_customer = await connection.query(`SELECT id FROM customers WHERE name = $1`, [name])

        await connection.query(`UPDATE customers SET (name, phone, cpf, birthday) WHERE id =$1 VALUES ($2, $3, $4, $5)`, [id_customer])
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);        
    }
}

export{
    listCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer
}