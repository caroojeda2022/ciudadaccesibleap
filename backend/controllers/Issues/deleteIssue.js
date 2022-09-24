const selectIssueByIdQuery = require('../../db/IssueQueries/selectIssueByIdQuery');
const deleteIssueQuery = require('../../db/issueQueries/deleteIssueQuery');

const { generateError, deletePhoto } = require('../../helpers');

const deleteIssue = async (req, res, next) => {
    try {
        const { idIssue } = req.params;

        const { idUser } = req;

        // Obtener info del lugar con problemas de acceso (issue) a borrar.
        const issue = await selectIssueByIdQuery(idUser, idIssue);

        // Si el id del lugar con problemas de acceso (issue) no coincide con el id del token mostrar un error.
        if (idUser !== issue.idUser) {
            throw generateError('No tienes suficientes permisos', 401);
        }

        // Si el lugar con problemas de acceso (issue) tiene vinculada 1 imagen la eliminamos.
        if (issue.image) {
            await deletePhoto(issue.image);
        }
            await deleteIssueQuery(idIssue);

        res.send({
            status: 'ok',
            message: 'Lugar con problemas de acceso eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteIssue;
