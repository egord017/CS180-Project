-- \i init.sql

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_followers CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users_groups CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS workshops CASCADE;
DROP TABLE IF EXISTS workshop_threads CASCADE;
DROP TABLE IF EXISTS freeform_critiques CASCADE;



CREATE TABLE users(
    userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userName VARCHAR(255) UNIQUE NOT NULL,
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
    -- user_id INTEGER REFERENCES users(userID),
    role_id INT,
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE users_followers (
    user_id uuid REFERENCES users(userID),
    follower_id uuid REFERENCES users(userID),
    -- user_id INTEGER REFERENCES users(userID),
    -- follower_id INTEGER REFERENCES users(userID),
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
    time_stamp timestamp DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(userID) ON DELETE SET NULL,
    FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
);

CREATE TABLE workshops (
    id SERIAL PRIMARY KEY,
    group_id INTEGER,
    group_order INTEGER,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

CREATE TABLE workshop_threads (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    workshop_id INTEGER,
    title TEXT NOT NULL,
    context TEXT,
    preference TEXT,
    post_body TEXT,
    passage_body TEXT NOT NULL,
    time_stamp timestamp DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(userID) ON DELETE SET NULL,
    FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);


CREATE TABLE freeform_critiques (
    id SERIAL PRIMARY KEY,
    user_id uuid,
    workshop_thread_id INTEGER,
    opening TEXT,
    body TEXT,
    closing TEXT,
    edited_passage TEXT,
    time_stamp timestamp DEFAULT NOW(),
    FOREIGN KEY (workshop_thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(userID) ON DELETE SET NULL
);


CREATE TABLE comments (
    -- id SERIAL PRIMARY KEY,
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

-- USE AS DUMMY USER. copy the user_id
INSERT INTO users(userID, userName, userEmail, userPassword, userBio) VALUES ('9a80cfb3-5535-4889-8fca-b213ae3607ba', 'dummy', 'dummy@gmail.com','dummy', 'a dummy');
INSERT INTO users(userID, userName, userEmail, userPassword, userBio) VALUES ('7ce5ee1d-8889-4892-813e-54870e4172c2', 'friend', 'dummy2@gmail.com','friend', 'your friend');
INSERT INTO users(userID, userName, userEmail, userPassword, userBio) VALUES ('c7e8dea4-5998-47db-9ce6-2f22afb9ffb6', 'elliot', 'robot@gmail.com','elliot', 'my nanme is elliot');
INSERT INTO users(userID, userName, userEmail, userPassword, userBio) VALUES ('25b36e80-82f0-487a-bb23-602b4d39a93b', 'apple', 'apple@gmail.com','$2b$10$vrhYrjTMSJT4OupbqzgOe.qJZJoWiIDEd0UHrsKtfOAcXYWN7ydH6', 'my nanme is elliot');
INSERT INTO users(userID, userName, userEmail, userPassword, userBio) VALUES ('6e426c4e-c39f-4f5b-b235-7e471a1f7d46', 'bob', 'bob@gmail.com','$2b$10$qFNcuDvRkHWPciI03UrLg.11zNwc9m0C9jxkZH3G38PdLFW7XCPXy', 'my nanme is bob');

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


-- WORKSHOP CHANNELS --
INSERT INTO workshops (group_id, name, description)
VALUES (1, 'Short Stories Workshop', 'Post your short stories for critique here :)');

INSERT INTO workshops (group_id, name, description)
VALUES (1, 'Close Reading Workshop', 'Post your essays, paragraphs, bits for critique here :)');

-- WORKSHOP THREAD --
INSERT INTO workshop_threads (user_id, workshop_id, title, context, preference, post_body, passage_body)
VALUES ('9a80cfb3-5535-4889-8fca-b213ae3607ba', 1, 'Notes From The Ground CH2', 'A cynical man has just finished rambling on free will, and is embarassed.','I welcome all thoughts! I have no idea what people are thinking while they read so the more information the better! :) I want to know if the chapter is engaging. where in this did you find yourself skipping lines?', 'let me know what u think :3',
 '“I should like to tell you now, whether you want to hear it or not, why I couldn’t even make an insect of myself. I tell you solemnly that I have wanted to make an insect of myself many times. But I couldn’t succeed even in that. I swear to you that to think too much is a disease, a real, actual disease. For ordinary human life it would be more than sufficient to possess ordinary “human intellectual activity, that is to say, half or a quarter as much as falls to the lot of an educated man in our unhappy nineteenth century, and especially one having the misfortune to live in St Petersburg, the most abstract and intentional city in the whole round world. (Towns can be either intentional or unintentional.) It would be quite enough, for example, to have the consciousness of all our so-called men of action and public figures. I am prepared to let you think that in writing all this I am simply striking attitudes and scoring off men of action, and in the worst of taste, too; I am rattling my sword, like that officer. But who can be vain of his disease, still less swagger with it? Why do I say that, though? Everybody does it – we all show off with our diseases, and I, perhaps, more than anybody. Don’t let’s argue; I expressed myself clumsily. But all the same I’m firmly convinced that not only a great deal, but every kind, of intellectual activity is a disease. I hold to that. Let us leave it for the moment. Tell me this: why is it that it[…]”

Excerpt From
Notes from Underground and The Double
Fyodor Dostoyevsky
This material may be protected by copyright.');

INSERT INTO workshop_threads (user_id, workshop_id, title, context, preference, post_body, passage_body)
VALUES ('9a80cfb3-5535-4889-8fca-b213ae3607ba', 1, 'lorem ipsum', 'A cynical man has just finished rambling on free will, and is embarassed.','I welcome all thoughts! I have no idea what people are thinking while they read so the more information the better! :) I want to know if the chapter is engaging. where in this did you find yourself skipping lines?', 'let me know what u think :3',
 'lorem ipsum');

INSERT INTO workshop_threads (user_id, workshop_id, title, context, preference, post_body, passage_body)
VALUES ('9a80cfb3-5535-4889-8fca-b213ae3607ba', 1, 'Loomings', 'A cynical man has just finished rambling on free will, and is embarassed.','I welcome all thoughts! I have no idea what people are thinking while they read so the more information the better! :) I want to know if the chapter is engaging. where in this did you find yourself skipping lines?', 'let me know what u think :3',
 'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.');


--BODY CRITIQUE --

INSERT INTO freeform_critiques (user_id, workshop_thread_id, opening,body, closing)
VALUES ('c7e8dea4-5998-47db-9ce6-2f22afb9ffb6', 1, 'Pretty good, pretty good.', 'Yeah, real good stuff. ', 'Last paragraph needs work, but overall a great and interesting read.');

INSERT INTO freeform_critiques (user_id, workshop_thread_id, opening,body, closing)
VALUES ('c7e8dea4-5998-47db-9ce6-2f22afb9ffb6', 1, 'Pretty good, pretty good.', 'Yeah, real good stuff. ', 'Last paragraph needs work, but overall a great and interesting read.');

INSERT INTO embedded_critiques (user_id, workshop_thread_id, critique_body)
VALUES ('c7e8dea4-5998-47db-9ce6-2f22afb9ffb6', 1, 'Last paragraph needs work, but overall a great and interesting read.');

INSERT INTO embedded_comments (critique_id, comment, index_start, index_end)
VALUES (1, 'fix this', 0, 5);
