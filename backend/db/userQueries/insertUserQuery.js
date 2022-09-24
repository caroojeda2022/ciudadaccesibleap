const bcrypt = require('bcrypt');
const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const insertUserQuery = async (idUser, username, email, password) => {

    let connection;

    try {
        connection = await getConnection();

        // Obtener un array de usuarios que cumplan la condición establecida.
        const [users] = await connection.query(
            `SELECT id FROM users WHERE email = ? OR username = ?`,
            [email, username]
        );

        // Si el array de usuarios tiene algún usuario quiere decir que el email está vinculado a otro usuario o que el usuario está repetido.
        if (users.length > 0) {
            throw generateError(
                'Ya existe un usuario con ese email o ese nombre de usuario en la base de datos',
                409
            );
        }

        // Encriptar la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario.
        const [newUser] = await connection.query(
            `INSERT INTO users (username, email, password, createdAt) VALUES(?, ?, ?, ?)`,
            [username, email, hashedPassword, new Date()]
        );

        // Retornamos el id del elemento creado.
        return newUser.insertId;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;
