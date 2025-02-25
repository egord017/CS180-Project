-- \i init.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_followers CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users_groups CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS comments CASCADE;


CREATE TABLE users(
    userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userName VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userBio VARCHAR(255) NULL
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

CREATE TABLE users_followers (
    user_id uuid REFERENCES users(userID),
    follower_id uuid REFERENCES users(userID),
    PRIMARY KEY (user_id, follower_id)
);


CREATE TABLE channels (
    id SERIAL PRIMARY KEY,
    group_id INTEGER,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);


CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    channel_id INTEGER,
    title TEXT NOT NULL,
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES users(userID) ON DELETE SET NULL,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    thread_id INTEGER,
    body TEXT,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(userID) ON DELETE SET NULL
);


-- USERS -------------------------------------------------
-- with bio
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('daniel', 'miyagifan2@icloud.com','miyagido', 'mr. miyagi once said...');
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('mark', 'omniboy23@icloud.com','earth', 'im not actually invincible');
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('walter', 'lakinglad@gmail.com','ihatehank', 'we need to cook jesse');
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('bucky', 'wintercapt@gmail.com','again', 'again again again');
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('hanni', 'newjeans32@gmail.com','kpop', 'supershy');
INSERT INTO users(userName, userEmail, userPassword, userBio) VALUES ('julian', 'strokesband52@gmail.com','hititfab', 'under cover of darkness');

-- without bio
INSERT INTO users(userName, userEmail, userPassword) VALUES ('billy', 'wiliaim321@gmail.com', 'sand');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('oats', 'aphan@gmail.com','test');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('fox', 'fdani012@ucr.edu','cs152');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('faye', 'fayela44@gmail.com','littlemice');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('jason', 'jms312@gmail.com','chillax');
INSERT INTO users(userName, userEmail, userPassword) VALUES ('rebby', 'becca102@yahoo.com','karmasa');

--FOLLOWERS----------------------------------------------------
-- daniel is being followed by billy, faye, and rebby
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), (SELECT userID FROM users WHERE userName = 'billy'));
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), (SELECT userID FROM users WHERE userName = 'faye'));
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), (SELECT userID FROM users WHERE userName = 'rebby'));

-- daniel is following billy, mark, and hanni
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'billy'), (SELECT userID FROM users WHERE userName = 'daniel'));
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'mark'), (SELECT userID FROM users WHERE userName = 'daniel'));
INSERT INTO users_followers(user_id, follower_id)
VALUES ((SELECT userID FROM users WHERE userName = 'hanni'), (SELECT userID FROM users WHERE userName = 'daniel'));

-- GROUPS -------------------------------------------------
INSERT INTO groups(name, description) VALUES ('Poet''s Society', 'Writing Group for poets'); -- 1
INSERT INTO groups(name, description) VALUES ('Short Story Group', 'Writing Group for short story writers'); -- 2
INSERT INTO groups(name, description) VALUES ('Non Fiction Group', 'Writing Group for non fiction writers'); -- 3
INSERT INTO groups(name, description) VALUES ('Fiction Group', 'Writing Group for fiction writers'); -- 4
INSERT INTO groups(name, description) VALUES ('Philosophy Group', 'Writing Group for philosophy writers'); -- 5
INSERT INTO groups(name, description) VALUES ('Creative Writing Group', 'Writing Group for creative writing writers'); -- 6


-- insert user into groups ------------------------------------------
INSERT INTO users_groups (group_id, user_id, role_id) 
VALUES (1, (SELECT userID FROM users WHERE userName = 'daniel'), 1);
INSERT INTO users_groups (group_id, user_id, role_id) 
VALUES (2, (SELECT userID FROM users WHERE userName = 'daniel'), 1);
INSERT INTO users_groups (group_id, user_id, role_id) 
VALUES (3, (SELECT userID FROM users WHERE userName = 'daniel'), 1);

INSERT INTO users_groups (group_id, user_id, role_id) 
VALUES (1, (SELECT userID FROM users WHERE userName = 'faye'), 1);
INSERT INTO users_groups (group_id, user_id, role_id) 
VALUES (2, (SELECT userID FROM users WHERE userName = 'faye'), 2);

-- CHANNELS -----------------------------------------------
-- 1
INSERT INTO channels (group_id, name, description)
VALUES (1, 'General', 'A general discussion channel');
INSERT INTO channels (group_id, name, description)
VALUES (1, 'Poetry Discussion', 'A general discussion channel');
INSERT INTO channels (group_id, name, description)
VALUES (1, 'Recommendations', 'A general discussion channel');
INSERT INTO channels (group_id, name, description)
VALUES (1, 'Sharing Channel', 'A general discussion channel');

-- 2
INSERT INTO channels (group_id, name, description)
VALUES (2, 'General Discussion', 'A general discussion channel');
INSERT INTO channels (group_id, name, description)
VALUES (2, 'Short Story Discussion', 'A general discussion channel');

-- 3
INSERT INTO channels (group_id, name, description)
VALUES (3, 'General Discussion', 'A general discussion channel');

-- 4
INSERT INTO channels (group_id, name, description)
VALUES (4, 'General Discussion', 'A general discussion channel');

-- 5
INSERT INTO channels (group_id, name, description)
VALUES (5, 'General Discussion', 'A general discussion channel');


-- THREADS -----------------------------------------------
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 1, 'I Love Poems', 'Why do you like poems?');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 1, 'Thoughts on Interstellar?', 'Not a poem but thoughts?');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 1, 'Join Miyagido', 'New club at school for locals');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 1, 'Favorite Poets?', 'What are your favorite poets and their works?');

INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 1, 'Favorite Poets?', 'What are your favorite poets and their works?');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 2, 'Favorite Poets?', 'What are your favorite poets and their works?');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 3, 'Favorite Poets?', 'What are your favorite poets and their works?');

INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 1, 'AI just took my job.', ':|');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 2, 'Thoughts on Walt Whitman?', 'jopawjfajef');
INSERT INTO threads (user_id, channel_id, title, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 2, 'Tom From East of Eden ', 'koawjflksa;dfl wel;kjf;wajf');


-- COMMENTS -----------------------------------------------
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'billy'), 1, 'Testing comments');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 1, 'I love Edgar Allan Poe!');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'faye'), 1, 'I hate Edgar Allan Poe!');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 1, 'join miyagido');

INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'fox'), 2, 'I love Edgar Allan Poe!');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'faye'), 2, 'I hate Edgar Allan Poe!');
INSERT INTO comments (user_id, thread_id, body) VALUES ((SELECT userID FROM users WHERE userName = 'daniel'), 3, 'join miyagido guys!');
