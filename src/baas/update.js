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
        var query = `UPDATE DAILYTASK SET `
        if (params.message) {
            query += `MESSAGE = '${params.message}',`
        }
        if (params.completed) {
            query += `COMPLETED = ${params.completed},`
        }
        if (query === `UPDATE DAILYTASK SET`) {
            throw { error: 'no parameter provided' }
        }
        query += `UPDATED_AT = to_timestamp(${Date.now()}/1000) WHERE ID = ${params.id};`
        const res = await client.query(query)
        client.end()
        return res
    }
    catch (err) {
        console.error('PostgreSQL error', err)
        client.end()
        return err
    }
}
