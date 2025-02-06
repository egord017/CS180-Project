CREATE DATABASE writersblock;

CREATE TABLE users(
    userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    useremail VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL
);