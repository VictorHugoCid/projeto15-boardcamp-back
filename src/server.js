import express from 'express';
import cors from 'cors';
import { connection } from './database/db.js';
// import dotenv from 'dotenv';

import categoriesRouters from './routers/categoriesRouters.js'
import customersRouters from './routers/customersRouters.js'
import gamesRouters from './routers/gamesRouters.js';
import rentalsRouters from './routers/rentalsRouters.js';

const server = express();

// dotenv.config();
server.use(cors());
server.use(express.json());

server.use( categoriesRouters);
server.use(customersRouters);
server.use(gamesRouters);
server.use(rentalsRouters);

connection.query('SELECT * FROM categories').then(()=> console.log('banco conectado')).catch(err=>{console.log(err)})

server.listen(4000, ()=>{
    console.log('Magic happens on 4000')
})
