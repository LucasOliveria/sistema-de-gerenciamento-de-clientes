import connection from "knex";

const port = process.env.DATABASE_PORT as number | undefined;

export const knex = connection({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  }
});

