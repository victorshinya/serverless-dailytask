const { Client } = require('pg')
const cert = `<ADD THE IBM CLOUD DATABASES FOR POSTGRESQL CERTIFICATE>`

async function main(params) {
    const client = new Client({
        host: "<HOSTNAME>",
        port: "<PORT>",
        user: "<USERNAME>",
        password: "<PASSWORD>",
        database: "<DATABASE>",
        ssl: {
            ca: cert
        }
    })

    try {
        await client.connect()
        const res = await client.query(`CREATE TABLE DAILYTASK (
            id SERIAL PRIMARY KEY,
            message character varying(255) NOT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL,
            completed BOOL NOT NULL);`)
            client.end()
            return res
    }
    catch (err) {
        console.error('PostgreSQL error', err)
        client.end()
        return err
    }
}
