module.exports = {
    def: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        'password': '',
        // password: '',
        database: 'akademik',
    },
    pool: {
        host: 'localhost',
        user: 'root',
        // password: '',
        password: '',
        database: 'akademik',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    }
}
