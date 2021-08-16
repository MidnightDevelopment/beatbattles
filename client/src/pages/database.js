import creds from "./creds";

const Pool = require('pg').Pool

const pool = new Pool({
    user: creds.user,
    host: creds.host,
    database: creds.database,
    password: creds.password,
    port: creds.port,
});

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM BattleInfo ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getMerchants,
}