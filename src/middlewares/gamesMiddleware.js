import { UNSAFE_NavigationContext } from "react-router-dom";
import { connection } from "../database/db.js";
import gamesSchema from '../schemas/gamesSchema.js'

async function gamesMiddleware(req, res, next) {
    const { name } = req.body

    const validation = gamesSchema.validate(req.body, { abortEarly: false })

    if(validation.error){
        const errors = validation.error.details.map(value => value.message);
        return res.status(400).send(errors)
    }

    try {
        const games = await connection.query(`SELECT * FROM games WHERE name = '${name}'`)

        if (games.rows[0]) {
            return res.status(409).send('Esse jogo já foi adicionado')
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500)

    }
    next();

}

export { gamesMiddleware }
