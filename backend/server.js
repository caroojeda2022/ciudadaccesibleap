// utiliza modulo dotenv para leer variables

require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('uploads'));

const authUser = require('./middlewares/authUser');
const authUserOptional = require('./middlewares/authUserOptional');

const {
  newUser,
  getUser,
  getOwnUser,
  loginUser,
} = require('./controllers/users');

// Registrar un usuario.
app.post('/users', newUser);

// Información sobre un usuario.
app.get('/users/:idUser', getUser);

// Información sobre el usuario del token.
app.get('/users', authUser, getOwnUser);

// Login de usuario.
app.post('/login', loginUser);

const {
  newIssue,
  listIssues,
  getIssue,
  voteIssue,
  deleteIssue,
} = require('./controllers/issues');

// Crear un issue.
app.post('/issues', authUser, newIssue);

// Listar todos los issues.
app.get('/issues', authUserOptional, listIssues);

// Información sobre un issue.
app.get('/issues/:IdIssue', authUserOptional,getIssue);

// Dar like a un issue.
app.post('/issues/:IdIssue/votes', authUser,  voteIssue);

// Borrar un issue.
app.delete('/issues/:idIssue', authUser, deleteIssue);

app.use((err, req, res) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
      status: 'error',
      message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
      status: 'error',
      message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening http://localhost:${PORT}`);
});