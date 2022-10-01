import express from 'express';
import { connection } from '../database/db.js';

async function listRentals(req, res) {
    const { customerId } = req.query;



    try {
        // validar se tem query
        const rentals = await connection.query('SELECT * FROM rentals')

        res.status(200).send(rentals)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function insertRent(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        await connection.query('INSERT INTO rentals (customerId, gameId, daysRented) VALUES ($1, $2, $3)', [customerId, gameId, daysRented])

        res.sendStatus(201)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}

async function finalizeRent(req, res) {

    try {

        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function deleteRent(req, res) {
    const { id } = req.params;


    try {
        // validar se o id existe
        // validar se o aluguel já está finalizado
        await connection.query('DELETE FROM rentals WHERE id = $1',[id])


    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}



export {
    listRentals,
    insertRent,
    finalizeRent,
    deleteRent,
}