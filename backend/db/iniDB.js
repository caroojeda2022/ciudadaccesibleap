const getConnection = require('./getConnection');

async function main() {
    // Variable que almacena conexión libre de la base de datos.
    let connection;

    try {
        // Obtenemos una conexión libre.
        connection = await getConnection();

        console.log('Borrando tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS votes');
        await connection.query('DROP TABLE IF EXISTS tweets');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE tweets (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                text VARCHAR(280) NOT NULL,
                image VARCHAR(100),
                createdAt TIMESTAMP NOT NULL
            )
        `);

        await connection.query(`
            CREATE TABLE votes(
                id INT PRIMARY KEY AUTO_INCREMENT,
                value BOOLEAN DEFAULT true,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                idTweet INT NOT NULL,
                FOREIGN KEY (idTweet) REFERENCES tweets (id) ON DELETE CASCADE,
                createdAt TIMESTAMP NOT NULL
            )
        `);

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err);
    } finally {
        // Si existe una conexión la liberamos.
        if (connection) connection.release();

        // Cerramos el proceso actual.
        process.exit();
    }
}

// Llamamos a la función principal.
main();

