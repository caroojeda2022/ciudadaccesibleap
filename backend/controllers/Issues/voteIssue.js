const insertVoteQuery = require('../../db/issueQueries/insertVoteQuery');

const voteIssue = async (req, res, next) => {
    try {
        const { idIssue } = req.params;

        const value = await insertVoteQuery(req.idUser, idIssue);

     // Para agregar un like sobre el comentario del lugar con problemas de acceso (issue).//
        res.send({
            status: 'ok',
            message: value ? 'Like agregado' : 'Like eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = voteIssue;
