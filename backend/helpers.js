// Aquí estan las funciones que se reutilizan en la api. //

const fs = require ('fs/promises');
const path = require ('path');

const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

const deletePhoto = async (photoName) => {
  try {
      // Creamos la ruta absoluta a la foto.
      const photoPath = path.join(__dirname, 'uploads', photoName);

      // Eliminamos la foto del disco.
      await fs.unlink(photoPath);
  } catch {
      throw new Error('Error al eliminar la imagen del servidor');
  }
};

module.exports = {
  generateError,
  createPathIfNotExists,
  deletePhoto,
};
