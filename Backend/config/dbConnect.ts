import { Client } from "pg";

// export const client = new Client({
//   host: process.env.POSTGRES_HOST,
//   port: Number(process.env.POSTGRES_PORT),
//   database: process.env.POSTGRES_DATABASE,
//   user: process.env.POSTGRES_USER,
//   password: String(process.env.POSTGRES_PASSWORD),
// });


export const client = new Client({
    host: "satao.db.elephantsql.com",
    port: 5432,
    database: "ijgxkxzp",
    user: "ijgxkxzp",
    password: 'TpM9MzDUSM0hyq9dietKjSk004B5Td2X' ,
  });



// //   satao.db.elephantsql.com
// POSTGRES_PORT = 5432
// POSTGRES_DATABASE = ijgxkxzp
// POSTGRES_USER = ijgxkxzp
// POSTGRES_PASSWORD = 'TpM9MzDUSM0hyq9dietKjSk004B5Td2X'

export default async ()=>await client.connect()