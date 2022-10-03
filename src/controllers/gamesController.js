import express, { request } from 'express';
import { connection } from '../database/db.js';

async function listGames(req, res) {
    const categorieName = req.query.name

    try {
        // corrigir UperCase
        if (categorieName) {
            const newName = categorieName.toLowerCase()
            const games = await connection.query(`
            SELECT * FROM 
                games 
                WHERE name LIKE '${newName}%'`)

            return res.status(200).send(games.rows)
        }

        const games = await connection.query(`
        SELECT 
            games.id,
            games.name,
            games.image,
            games."stockTotal",
            games."categoryId",
            games."pricePerDay",
            categories.name AS "categoryName"
        FROM games JOIN categories ON games."categoryId"=categories.id`)

        res.status(200).send(games.rows)

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}

async function insertGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body

    const newName = name.toLowerCase();

    try {
        // validate lembrar do maldito Joi
        const games = await connection.query(`SELECT * FROM games WHERE name = $1`, [newName])
        console.log(games.rows[0])

        if (games.rows[0]) {
            return res.status(409).send('Esse jogo já foi adicionado')
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [newName, image, stockTotal, categoryId, pricePerDay])

        res.sendStatus(201)

    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}

export {
    listGames,
    insertGame,
}