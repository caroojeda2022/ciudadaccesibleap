const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const insertIssueQuery = require('../../db/issueQueries/insertIssueQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newIssue = async (req, res, next) => {
    try {
        const { text } = req.body;

        // Si el texto no existe o supera 300 caracteres muestra un error.
        if (!text || text.length > 300) {
            throw generateError(
                'Falta el texto o su longitud supera los 300 caracteres',
                400
            );
        }

        // Variable que almacena el nombre de la imagen, si es agregada.//
        let imgName;

        // Si se agrega una imagen, se guarda.
        if (req.files && req.files.image) {
            // Crear una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            // Crear el directorio si no existe.
            await createPathIfNotExists(uploadsDir);

            // Procesar la imagen y convertirla en objeto de tipo "Sharp".
            const sharpImg = sharp(req.files.image.data);

            // Redimensionar la imagen para evitar al 250px por ancho.//
            sharpImg.resize(250);

            // Generar un nombre único para la imagen.
            imgName = `${nanoid(24)}.jpg`;

            // Generamos la ruta absoluta a la imagen.
            const imgPath = path.join(uploadsDir, imgName);

            // Guardar la imagen en el directorio de descargas.
            await sharpImg.toFile(imgPath);
        }

        // Agregamos un lugar con problema de acceso (Issue).//
        insertIssueQuery(req.idUser, text,imgName);

        res.send({
            status: 'ok',
            message: 'Lugar con problema de acceso creado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newIssue;
