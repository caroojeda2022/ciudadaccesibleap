const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectAllIssuesQuery = async (idUser, keyword) => {
    let connection;

    try {
        connection = await getConnection();

        let issues;

        // buscar palabra clave "keyword" es los issues, sino volver a todos los issues registrados.
        if (keyword) {
            [issues] = await connection.query(
                `
                    SELECT T.id, T.idUser, U.username, T.text, T.image, SUM(IFNULL(V.value = 1, 0)) AS likes, T.idUser = ? AS owner, BIT_OR(V.idUser = ? AND V.value = 1) AS likedByMe, T.createdAt
                    FROM issues T
                    LEFT JOIN votes V 
                    ON T.id = V.idIssue
                    LEFT JOIN users U
                    ON T.idUser = U.id
                    WHERE T.text LIKE ?
                    GROUP BY T.id
                    ORDER BY T.createdAt DESC
                `,
                [idUser, idUser, `%${keyword}%`]
            );
        } else {
            [issues] = await connection.query(
                `
                    SELECT T.id, T.idUser, U.username, T.text, T.image, SUM(IFNULL(V.value = 1, 0)) AS likes, T.idUser = ? AS owner, BIT_OR(V.idUser = ? AND V.value = 1) AS likedByMe, T.createdAt
                    FROM issues T
                    LEFT JOIN votes V 
                    ON T.id = V.idIssue 
                    LEFT JOIN users U
                    ON T.idUser = U.id
                    GROUP BY T.id
                    ORDER BY T.createdAt DESC
                `,
                [idUser, idUser]
            );
        }

        if (issues.length < 1) {
            throw generateError('No se ha encontrado ningún lugar con problema de acceso', 404);
        }

        return issues;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllIssuesQuery;
