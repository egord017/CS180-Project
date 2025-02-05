DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users_groups;
DROP TABLE IF EXISTS channels;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    bio TEXT
);


CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE users_groups (
    group_id INT REFERENCES groups(id),
    user_id INT REFERENCES users(id),
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
    user_id INTEGER,
    channel_id INTEGER,
    title TEXT NOT NULL,
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    thread_id INTEGER,
    body TEXT,
    FOREIGN KEY (thread_id) REFERENCES threads(id)
);
INSERT INTO users(name, password) VALUES ('willy', 'sand');
INSERT INTO users(name, password) VALUES ('oats', 'sand');
INSERT INTO users(name, password) VALUES ('fox', 'sand');

INSERT INTO groups(id, name, description) VALUES (1, 'poet''s society', 'Writing Workshop for poets');
INSERT INTO groups(id, name, description) VALUES (2, 'Short Story Group', 'Writing Workshop for short story writers');

INSERT INTO channels (id, group_id, name, description)
VALUES (1, 1, 'General', 'A general discussion channel');

INSERT INTO channels (id, group_id, name, description)
VALUES (2, 1, 'Poetry Discussion', 'A poetry discussion channel');

INSERT INTO channels (id, group_id, name, description)
VALUES (3, 2, 'General Discussion', 'A general discussion channel');

INSERT INTO threads (id, user_id, channel_id, title, body) VALUES (1, 1, 1, 'Favorite Poets?', 'What are your favorite poets and their works?');
INSERT INTO threads (id, user_id, channel_id, title, body) VALUES (2, 3, 1, 'AI just took my job.', ':|');