CREATE DATABASE writersblock;

CREATE TABLE users(
    userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL
);