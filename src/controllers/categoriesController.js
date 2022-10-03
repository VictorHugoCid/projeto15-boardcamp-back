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

    const newName = name.toLowerCase();
    //validate
    if (!newName) {
        return res.sendStatus(400)
    }

    try {
        // fazer validação de categoria já existente retornnado 409
        const categorie = await connection.query('SELECT * FROM categories WHERE name = $1', [newName])

        if (categorie.rows[0]) {
            return res.status(409).send('Essa categoria já existe')
        }

        console.log(newName)
        console.log(categorie.rows)

        await connection.query('INSERT INTO categories (name) VALUES ($1)', [newName])
        res.status(201).send(categorie.rows[0])

    } catch (error) {
        console.error(error);
        res.sendStatus(500);

    }
}

export {
    listCategories,
    createCategorie,
}