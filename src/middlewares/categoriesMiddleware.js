import { UNSAFE_NavigationContext } from "react-router-dom";
import { connection } from "../database/db.js";

async function categorieMiddleware(req, res, next) {
    const { name } = req.body;

    try {
        if (!name) {
            return res.sendStatus(400)
        }

        const categories = (await connection.query('SELECT name FROM categories')).rows

        for (let i = 0; i < categories.length; i++) {
            if (name === categories[i].name) {
                return res.status(409).send('Essa categoria já existe')
            }
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next();
}

export { categorieMiddleware };