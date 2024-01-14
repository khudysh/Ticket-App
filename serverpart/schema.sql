CREATE DATABASE IF NOT EXISTS sqltestdb;

USE sqltestdb;

CREATE TABLE IF NOT EXISTS `test` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `summary` text NOT NULL,
  `content` text NOT NULL,
  `priority` varchar(255) NOT NULL DEFAULT 'LOW',
  `status` varchar(255) NOT NULL DEFAULT 'CREATED',
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `answ` varchar(255) NOT NULL DEFAULT '',
  `from` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DELIMITER //
CREATE TRIGGER update_ticket_before_update
BEFORE UPDATE ON ticket
FOR EACH ROW
BEGIN
  SET NEW.update_date = CURRENT_TIMESTAMP;
END; //
DELIMITER ;

CREATE TABLE IF NOT EXISTS users (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `login` VARCHAR(255) NOT NULL UNIQUE,
    `user_type` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `message` TEXT NOT NULL,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE USER IF NOT EXISTS 'sqltester'@'localhost' IDENTIFIED BY 'mysecret1';
GRANT SELECT,UPDATE,INSERT,DELETE ON sqltestdb.* TO 'sqltester'@'localhost';
