import { connection } from "../database/db.js";

async function gamesMiddleware(req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body
    
    const games = await connection.query(`SELECT * FROM games WHERE name = '${name}'`)

    if (name) {
        return res.status(409).send('Esse jogo já foi adicionado')
    }
}