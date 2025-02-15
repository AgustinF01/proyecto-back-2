**Proyecto para el curso de backend 2**

El proyecto se basa en un sistema de gestion de turnos de un gimnasio, dentro del mismo hay 3 roles (admin, teacher, user). Los usuarios se podran registrar y cargar los dias de asistencia, los teacher seran asignados por el administrador a cada user y el rol de administrador podra gestionar todos los usuarios.

**ACLARACION**

Actualmente solo funciona la peticion register, pudiendo registrar usuarios junto a sus respectivos roles desde Postman con un metodo POST y login, tambien con metodo POST.
Si se ejecuta el frontend se puede visualizar la pagina de login para luego ser redirigido al dashboard indicando dicho rol asociado a cada credencial.
Deje el archivo .env para poder probar la base de datos, ya que es solo de prueba y no tiene datos sensibles, pero posteriormente sera ocultada.

**REVISAR LA DOCUMENTACION PARA COMPRENDER SU USO**

## Usuario registrados actualmente

* **ROL USER:**
 + name: Juan Pérez
 + email: juan@email.com
 + password: 123456
 + role: user

* **ROL TEACHER:**
 + name: Emanuel Pereira
 + email: emanuel@email.com
 + password: 123456
 + role: teacher

* **ROL ADMIN:**
 + name: Santiago Gonzalez
 + email: santiago@email.com
 + password: 123456
 + role: admin

**Dependencias del Proyecto**

### Backend

* bcryptjs: ^3.0.0
* concurrently: ^9.1.2
* cookie-parser: ^1.4.7
* cors: ^2.8.5
* dotenv: ^16.4.7
* express: ^4.21.2
* express-session: ^1.18.1
* jsonwebtoken: ^9.0.2
* mongoose: ^8.10.0
* passport: ^0.7.0
* passport-jwt: ^4.0.1

### Frontend

* @emotion/react: ^11.14.0
* @emotion/styled: ^11.14.0
* @mui/material: ^6.4.4
* axios: ^1.7.9
* concurrently: ^9.1.2
* cors: ^2.8.5
* express: ^4.21.2
* js-cookie: ^3.0.5
* jwt-decode: ^4.0.0
* react: ^19.0.0
* react-dom: ^19.0.0
* react-router-dom: ^7.1.5

**Peticiones**

### Registro

* **Método:** POST
* **URL:** http://localhost:8080/api/users/register
* **Cuerpo de la petición:**
 + name: string (nombre del usuario)
 + email: string (correo electrónico del usuario)
 + password: string (contraseña del usuario)
 + role: string (rol del usuario, opciones: "user", "teacher", "admin")

### Login

* **Método:** POST
* **URL:** http://localhost:8080/api/users/login
* **Cuerpo de la petición:**
 + email: string (correo electrónico del usuario)
 + password: string (contraseña del usuario)

### Gestión de Usuarios (Solo Admin)

#### Obtener todos los usuarios

* **Método:** GET
* **URL:** http://localhost:8080/api/users
* **Authorization:** Bearer TOKEN_DEL_ADMIN

#### Obtener usuario por ID

* **Método:** GET
* **URL:** http://localhost:8080/api/users/:id
* **Authorization:** Bearer TOKEN_DEL_ADMIN

#### Actualizar usuario

* **Método:** PUT
* **URL:** http://localhost:8080/api/users/:id
* **Authorization:** Bearer TOKEN_DEL_ADMIN
* **Cuerpo de la petición:**
 + name: string (nuevo nombre del usuario)
 + email: string (nuevo correo electrónico del usuario)
 + role: string (nuevo rol del usuario)

#### Eliminar usuario

* **Método:** DELETE
* **URL:** http://localhost:8080/api/users/:id
* **Authorization:** Bearer TOKEN_DEL_ADMIN

### Gestión de Turnos

#### Crear turno

* **Método:** POST
* **URL:** http://localhost:8080/api/turnos
* **Authorization:** Bearer TOKEN_DEL_USUARIO
* **Cuerpo de la petición:**
 + dias: array (días del turno)

#### Obtener todos los turnos

* **Método:** GET
* **URL:** http://localhost:8080/api/turnos
* **Authorization:** Bearer TOKEN_DEL_USUARIO

#### Obtener turno por ID

* **Método:** GET
* **URL:** http://localhost:8080/api/turnos/:id
* **Authorization:** Bearer TOKEN_DEL_USUARIO

#### Eliminar turno

* **Método:** DELETE
* **URL:** http://localhost:8080/api/turnos/:id
* **Authorization:** Bearer TOKEN_DEL_ADMIN

### Gestión de Profesores (Admin)

#### Asignar profesor a turno

* **Método:** PUT
* **URL:** http://localhost:8080/api/turnos/:id/asignar-profesor
* **Authorization:** Bearer TOKEN_DEL_ADMIN
* **Cuerpo de la petición:**
 + teacherId: string (ID del profesor)

#### Obtener todos los profesores

* **Método:** GET
* **URL:** http://localhost:8080/api/users?role=teacher
* **Authorization:** Bearer TOKEN_DEL_ADMIN

### Administrar Roles (Admin)

#### Actualizar rol

* **Método:** PUT
* **URL:** http://localhost:8080/api/users/:id/role
* **Authorization:** Bearer TOKEN_DEL_ADMIN
* **Cuerpo de la petición:**
 + role: string (nuevo rol del usuario)
