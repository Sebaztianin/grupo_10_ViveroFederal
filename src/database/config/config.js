module.exports = {

    "development": {
        "username": "root",
        "password": null,
        "database": "vivero_federal_db",
        "host": "127.0.0.1",
        "dialect": "mysql" 
    },

    "test": {
        "username": process.env.MYSQLUSER,
        "password": process.env.MYSQLPASSWORD,
        "database": "vivero_federal_db",
        "host": process.env.MYSQLHOST,
        "port": process.env.MYSQLPORT,
        "dialect": "mysql"
    },

    "production": {
        "username": process.env.MYSQLUSER,
        "password": process.env.MYSQLPASSWORD,
        "database": "vivero_federal_db",
        "host": process.env.MYSQLHOST,
        "port": process.env.MYSQLPORT,
        "dialect": "mysql"
    }

}

