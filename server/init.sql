CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users_groups CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS comments CASCADE;


CREATE TABLE users(
    userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL
);


CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE users_groups (
    group_id INT REFERENCES groups(id),
    user_id uuid REFERENCES users(userID),
    role_id INT,
    PRIMARY KEY (group_id, user_id)
);


CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    group_id INTEGER,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id)
);


CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    channel_id INTEGER,
    title TEXT NOT NULL,
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES users(userID),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    thread_id INTEGER,
    body TEXT,
    FOREIGN KEY (thread_id) REFERENCES threads(id),
    FOREIGN KEY (user_id) REFERENCES users(userID)
);
INSERT INTO users(userName, userEmail, userPassword) VALUES ('billy', 'wiliaim321@gmail.com', 'sand');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('oats', 'wiliaim321@gmail.com','sand');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('fox',  'wiliaim321@gmail.com','sand');

INSERT INTO groups(id, name, description) VALUES (1, 'poet''s society', 'Writing Workshop for poets');
INSERT INTO groups(id, name, description) VALUES (2, 'Short Story Group', 'Writing Workshop for short story writers');

INSERT INTO channels (id, group_id, name, description)
VALUES (1, 1, 'General', 'A general discussion channel');

INSERT INTO channels (id, group_id, name, description)
VALUES (2, 1, 'Poetry Discussion', 'A poetry discussion channel');

INSERT INTO channels (id, group_id, name, description)
VALUES (3, 2, 'General Discussion', 'A general discussion channel');

INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 1, 'Favorite Poets?', 'What are your favorite poets and their works?');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 1, 'AI just took my job.', ':|');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'oats'), 2, 'How to study effectively?', 'What do you do?');


INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 1, 'Testing comments');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 1, 'I love Edgar Allan Poe!');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'oats'), 2, 'how creative!');