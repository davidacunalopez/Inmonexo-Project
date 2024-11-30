drop table IF EXISTS eventos Cascade;
drop table IF EXISTS pagos Cascade;
drop table IF EXISTS clientes Cascade;
drop table IF EXISTS intereses Cascade;
drop table IF EXISTS propiedades Cascade;
drop table IF EXISTS usuarios Cascade;

--Creación de todas las tablas
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(70) NOT NULL,
    rol SMALLINT NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Propiedades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(19,4) NOT NULL,
    estado SMALLINT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    capacidad SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    inRed SMALLINT NOT NULL DEFAULT 0,
    getAgent SMALLINT NOT NULL DEFAULT 0,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE SET NULL
);

CREATE TABLE Intereses (
    id SERIAL PRIMARY KEY,
    fecha DATE DEFAULT CURRENT_TIMESTAMP,
    tipo SMALLINT NOT NULL,
    propiedadId SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id) ON DELETE CASCADE,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE CASCADE
);


CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    origen VARCHAR(50) NOT NULL,
    tipo SMALLINT NOT NULL,
    usuarioId SMALLINT DEFAULT 0,
    propiedadId SMALLINT DEFAULT 0,
    descripcion VARCHAR(200) NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE SET NULL ,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id) ON DELETE SET NULL
);

CREATE TABLE Pagos (
    id SERIAL PRIMARY KEY,
    detalles VARCHAR(50) NOT NULL,
    monto DECIMAL(19, 4) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    propiedadId SMALLINT NOT NULL,
    usuarioid SMALLINT NOT NULL,
    FOREIGN KEY (propiedadId) REFERENCES Propiedades(id)
    ON DELETE CASCADE,
    FOREIGN KEY (usuarioid) REFERENCES Usuarios(id)
    ON DELETE CASCADE
);

CREATE TABLE Eventos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    fechaEvento DATE NOT NULL,
    estado SMALLINT NOT NULL,
    usuarioId SMALLINT NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id)
    ON DELETE CASCADE,
    fechaPublicacion DATE DEFAULT CURRENT_TIMESTAMP
);

--Usuarios de Pruebas
INSERT INTO Usuarios (nombre, correo, contrasena, rol)
VALUES ('Dario Espinoza Aguilar', 'darioespinoza477@gmail.com', '12345678', 0),
('Jose Pablo Mora', 'pablo@gmail.com', '87654321', 1),
('Pri Jimenez', 'pri@gmail.com', '$2a$10$LRTWBfpOj7g/7Gm0TY7rA.0v/aw4w1GdlrnHUaxqs.m4bsS0/KaSe', 1);