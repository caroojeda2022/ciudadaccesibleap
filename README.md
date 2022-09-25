
# Proyecto ciudadaccesibleapi - 

En este ejercicio se esperaba que permita consultar y publicar lugares con problemas de accesibilidad en una ciudad.
ver todos los problemas de accesiblidad registrados, divididos entre pendiente y resuelto.La base de datos acepta participantes anónimos y administrador, en una instancia MySQL local.Usa el email ciudadaccesible@mail.com y la contraseña: ciudadaccesible para controlar el usuario administrador.

En la API debería :
// Registrar un nuevo lugar con problemas de accesibilidad. (ISSUES)
// Marcar un lugar con problemas de accesibilidad como activos y resuelto.
// Ver la lista de lugares con problemas de accesibilidad en un barrio.
// Los usuarios accede mediante un formulario de login y acceder a la zona de administración.

//El perfil administrador permite incluir Título
Descripción, Foto, Ciudad, Barrio, Marcar un problema de accesibilidad como resuelto

## Instalar y ejecutar

npm start
npm run o npm run initDB para tablas de la base de datos
guardar archivo .env 
npm run initDB

## Endpoints 
User:
id
email
password
createdAt
modifiedAt

Issue: (problema de accesibilidad)
id
idUser
text
image (opcional)
createdAt
modifiedAt

Usuarios:
POST [/users] - Registro de usuario 
GET [/users/:id] - Devuelve información de usuario 
GET [/users] - Devuelve información del usuario  ( con token) 
POST [/login] - Login de usuario (devuelve token) 

Issues:
POST [/issues] - Permite crear un issue (con token) 
GET [/issues] - Lista todos los issue 
GET [/issues/:idIssue] - Devuelve un issue 
DELETE [/issues/:id] - Borra un issue si eres su autor (con token) 

## INSTRUCCIONES DE USO.
Debe llevar un archivo de POSTMAN con las consultas que se pueden realizar, divididos en 2 tipos: Usuarios e incidencias de problemas de accesibilidad (issues) 

// New Issue: registrar nuevo problema de accesibilidad.
// Get Issues: consultar problemas de accesibilidad de una ciudad/barrio. 
// Get Single Issue: consultar problema de accesibilidad por id.
// Update Single Isue: cambiar el estado (status) del problema de accesibilidad (resuelto/pendiente).
