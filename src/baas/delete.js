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
        if (!params.id) {
            throw { error: 'no identification provided' }
        }
        const res = await client.query(`DELETE FROM DAILYTASK WHERE ID = ${params.id}`)
        client.end()
        return res
    }
    catch (err) {
        console.error('PostgreSQL error', err)
        client.end()
        return err
    }
}
