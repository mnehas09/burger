DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

USE burgers_db;

CREATE TABLE burgers(
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(300) NOT NULL,
  devoured BOOLEAN NOT NULL,
  date TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);








