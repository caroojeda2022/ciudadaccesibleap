const selectIssueByIdQuery = require('../../db/issueQueries/selectIssueByIdQuery');

const getIssue = async (req, res, next) => {
    try {
        const { idIssue } = req.params;
        const { idUser } = req;
        const issue = await selectIssueByIdQuery(idUser, idIssue);

        res.send({
            status: 'ok',
            data: {
                issue,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getIssue;
