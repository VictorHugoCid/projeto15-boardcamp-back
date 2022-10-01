import { connection } from "../database/db.js";

async function listCategories(req, res) {

    try {
        // validate

        const categories = await connection.query('SELECT * FROM categories')
        res.send(categories.rows)
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}

async function createCategorie(req, res) {
    const { name } = req.body

    //validate
    if (!name) {
        return res.sendStatus(400)
    }

    try {
        // fazer validação de categoria já existente retornnado 409
        const categories = (await connection.query('SELECT name FROM categories')).rows

        for (let i = 0; i < categories.length; i++) {
            if(name === categories[i].name){
                return res.status(409).send('essa categoria já existe')
            }
        }

        // await connection.query('INSERT INTO categories (name) VALUES ($1)', [name])
        res.status(201).send(categories)

    } catch (error) {
        console.error(error);
        res.sendStatus(500);

    }
}

export {
    listCategories,
    createCategorie,
}