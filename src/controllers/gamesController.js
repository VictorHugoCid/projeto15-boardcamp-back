import express, { request } from 'express';
import { connection } from '../database/db.js';

async function listGames(req, res){
    const categorieName = req.query.name

    try {
        // corrigir UperCase
        if(categorieName){
            const games = await connection.query(`
            SELECT * FROM 
                games 
                WHERE name LIKE '${categorieName}%'`)

            return res.status(200).send(games.rows)
        }

        const games = await connection.query('SELECT * FROM games')

        res.status(200).send(games.rows)
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}


async function insertGame(req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body
    

    try {
        // validate lembrar do maldito Joi
        const games = await connection.query(`SELECT * FROM games WHERE name = '${name}'`)

        if(name){
            return res.status(409).send('Esse jogo já foi adicionado')
        }

        // await connection.query('INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay])

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