// database/db.js
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
        },
        options: `project=${process.env.ENDPOINT_ID}`, // Adicione aqui
    },
    logging: false
});

export default sequelize;
