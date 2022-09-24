const getConnection = require('../db/getConnection');
const { generateError } = require('../helpers');

const issueExists = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        // Obtenemos id del tweet.
        const { idIssue } = req.params;

        const [issues] = await connection.query(
            `SELECT id FROM tweets WHERE id = ?`,
            [idIssue]
        );

        if (issues.length < 1) {
            throw generateError('Lugar con problemas de acceso no encontrado', 404);
        }

        // Saltamos al siguiente controlador.
        next();
    } catch (err) {
        next(err);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = issueExists;
