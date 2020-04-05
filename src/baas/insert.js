const { Client } = require('pg')
const cert = `{cert}`

async function main(params) {
    const client = new Client({
        host: '{host}',
        port: '{port}',
        user: '{user}',
        password: '{password}',
        database: '{database}',
        ssl: {
            ca: cert
        }
    })

    try {
        await client.connect()
        const res = await client.query(`INSERT INTO DAILYTASK(MESSAGE, CREATED_AT, UPDATED_AT, COMPLETED)
            VALUES('${params.message}', to_timestamp(${Date.now()}/1000), to_timestamp(${Date.now()}/1000), false);`)
        client.end()
        return res
    }
    catch (err) {
        console.error('PostgreSQL error', err)
        client.end()
        return err
    }
}
