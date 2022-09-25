const getConnection = require('../getConnection');

const insertVoteQuery = async (idUser, idIssue) => {
    let connection;

    try {
        connection = await getConnection();

        const [issues] = await connection.query(
            `SELECT value FROM votes WHERE idUser = ? AND idIssue = ?`,
            [idUser, idIssue]
        );

        if (issues.length < 1) {
            await connection.query(
                `INSERT INTO votes (idUser, idIssue, createdAt) VALUES (?, ?, ?)`,
                [idUser, idIssue, new Date()]
            );

            return true;
        } else {
            await connection.query(
                `UPDATE votes SET value = ? WHERE idUser = ? AND idIssue = ?`,
                [!issues[0].value, idUser, idIssue]
            );

            return !issues[0].value;
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertVoteQuery;
