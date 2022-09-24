const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, username, email, createdAt FROM users WHERE id = ?`,
            [idUser]
        );

        // Si no hay usuarios con ese id, se muestra un error.
        if (users.length < 1) {
            throw generateError('Usuario no encontrado', 404);
        }

        // destructuring de las propiedades que tienen registrado el usuario.
        const { id, username, email, createdAt } = users[0];

        // Información básica que retornaremos
        const userInfo = {
            id,
            username,
            createdAt,
        };

        // El mismo usuario puede agregar más info en su perfil // 
        if (idUser === users[0].id) {
            userInfo.email = email;
        }

        // Retorna el usuario que está en la posición 0 del array "users".
        return userInfo;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;
