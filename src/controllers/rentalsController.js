import express from 'express';
import dayjs from 'dayjs';
import { connection } from '../database/db.js';

async function listRentals(req, res) {
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    try {
        // validar se tem query
        if (customerId) {
            const rentals = await connection.query('SELECT * FROM rentals WHERE rentals."customerId" = $1', [customerId])
            return res.send(rentals.rows)
        }
        if (gameId) {
            const rentals = await connection.query('SELECT * FROM rentals WHERE rentals."gameId" = $1', [gameId])
            return res.send(rentals.rows)
        }



        const rentals = await connection.query(`
            SELECT 
            rentals.*,
            json_build_object('id', customers.id,'name', customers.name) AS customer,
            json_build_object('id', games.id,'name', games.name, 'categoryId', games."categoryId",'categoryName', games."categoryId") AS game
         FROM rentals 
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON  games.id = rentals."gameId"
        `)

        res.status(200).send(rentals.rows)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function insertRent(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const game = await connection.query(`SELECT * FROM games WHERE games.id = $1`, [gameId])

        const rentDate = dayjs(Date.now());
        const returnDate = null;
        const originalPrice = daysRented * game.rows[0].pricePerDay;
        const delayFee = null;

        await connection.query('INSERT INTO rentals ("customerId", "gameId","rentDate" ,"daysRented", "returnDate","originalPrice","delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)', [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.status(201).send(game.rows)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}

async function finalizeRent(req, res) {
    const { id } = req.params;

    try {
        const rent = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [id])

        if (rent.rowCount === 0) {
            return res.sendStatus(404);
        }

        if (rent.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysLate = (today - rent.rows[0].rentDate) / (1000 * 60 * 60 * 24);

        let delayFee = 0;
        if (daysLate > rent.rows[0].daysRented) {
            delayFee = rent.rows[0].pricePerDay * daysLate
        }

        await connection.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;', [today, delayFee, rent.rows[0].id]);

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
        const rent = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (!rent.rows[0]) {
            return res.sendStatus(404);
        }
        // validar se o aluguel já está finalizado
        const finalizedRent = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);

        if (!finalizedRent.rows[0].returnDate) {
            return res.sendStatus(400);
        }

        await connection.query('DELETE FROM rentals WHERE id = $1', [id]);

        res.sendStatus(201);


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