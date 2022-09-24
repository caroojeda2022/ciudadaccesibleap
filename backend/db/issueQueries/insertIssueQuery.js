const getConnection = require('../getConnection');

const insertIssueQuery = async (idUser, text, image = '') => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
                INSERT INTO Issues (idUser, text, image, createdAt)
                VALUES (?, ?, ?, ?)
            `,
            [idUser, text, image, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertIssueQuery;
