const getConnection = require('../getConnection');

const deleteIssueQuery = async (idIssue) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`DELETE FROM issues WHERE id = ?`, [idIssue]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteIssueQuery;
