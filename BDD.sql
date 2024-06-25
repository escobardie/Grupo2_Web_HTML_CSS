/*		Elimina, si existe, la base de datos llamada blog 	*/
DROP DATABASE IF EXISTS website;

/* 		Crea, si no existe, la base de datos llamada blog 	*/
CREATE DATABASE IF NOT EXISTS website;

/* 		Selecciona la base de datos llamada blog	*/
USE website;

/* 		Muestra las tablas de la base de datos seleccionada		*/
SHOW TABLES;

CREATE TABLE IF NOT EXISTS usuario (
	id INT UNSIGNED AUTO_INCREMENT,
	nombre VARCHAR(60) NOT NULL,
	apellido VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	username VARCHAR(30) NOT NULL,
	contrasena VARCHAR(30) NOT NULL,
	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS articulo (
	id INT UNSIGNED AUTO_INCREMENT,
    id_usuario INT UNSIGNED NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id)
);

ALTER TABLE articulo
ADD COLUMN texto_articulo varchar(250) NOT NULL;

DESCRIBE articulo;

ALTER TABLE articulo
ADD COLUMN titulo varchar(45) NOT NULL;

DESCRIBE articulo;