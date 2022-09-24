const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const selectUserByEmailQuery = require('../../db/userQueries/selectUserByEmailQuery');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Obtener usuario con el email.
        const user = await selectUserByEmailQuery(email);

        // Comprobar si las contraseñas coinciden.//
        const validPassword = await bcrypt.compare(password, user.password);

        // Mostrar error en pantalla sino coincide //
        if (!validPassword) {
            throw generateError('Contraseña incorrecta', 401);
        }
        // Información que queremos guardar en el token.
        const payload = {
            id: user.id,
        };

        // Firmar el token.
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
