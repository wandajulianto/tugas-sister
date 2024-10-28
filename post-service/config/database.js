let mysql = require('mysql')
const util = require('util')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_post_service'
})

connection.connect(function(error){
    if (!!error) {
        console.log(error)
    } else {
        console.log('Connection Successfully!')
    }
})

// ubah connection.query menjadi berbasis promise
const query = util.promisify(connection.query).bind(connection);

module.exports = { connection, query }
