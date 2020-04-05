const request = require('request-promise')

async function main(params) {
    return request({
        method: 'POST',
        uri: 'https://api.us-south.databases.cloud.ibm.com/v4/ibm/deployments/<DEPLOYMENT_ID>/backups',
        headers: {
            Authorization: 'Bearer <IBM CLOUD API key>'
        },
        json: true
    })
    .then(res => {
        return res
    })
    .catch(err => {
        console.error('PostgreSQL initiate on-demand backup', err.error.errors)
        return err
    })
}
