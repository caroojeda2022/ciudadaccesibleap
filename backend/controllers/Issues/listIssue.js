const selectAllIssuesQuery = require('../../db/issueQueries/selectAllIssuesQuery');

const listIssues = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const { idUser } = req;
        const issues = await selectAllIssuesQuery(idUser, keyword);

        res.send({
            status: 'ok',
            data: {
                issues,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listIssues;
