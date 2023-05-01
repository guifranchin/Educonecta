import knex from 'knex';

const knexfile = require('../../knexfile.js');


const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

export default knex("postgresql://postgres:admin@localhost:5432/postgres");