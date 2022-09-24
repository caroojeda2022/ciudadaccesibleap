const insertUserQuery = require('../../db/userQueries/insertUserQuery');

const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        // Obtener los campos del body.
        const { username, email, password } = req.body;

        // Si faltan campos, mostrar un error.
        if (!username || !email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Crear un usuario en la base de datos y obtener el id.
        const idUser = await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: `Usuario con id ${idUser} creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
