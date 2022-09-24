const selectUserByIdQuery = require('../../db/userQueries/selectUserByIdQuery');

// Registro de cada usuario con 1 identificador específico para la api //
const getOwnUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.idUser);

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getOwnUser;
