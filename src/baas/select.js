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
        var query = `SELECT * FROM DAILYTASK`
        if (params.message) {
            query += ` WHERE MESSAGE LIKE '%${params.message}%';`
        }
        const res = await client.query(query)
        client.end()
        return { rows: res.rows }
    }
    catch (err) {
        console.error('PostgreSQL error', err)
        client.end()
        return err
    }
}
