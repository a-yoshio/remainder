CREATE TABLE remainder (
id serial PRIMARY KEY,
contents varchar(20),
user_id int,
tag_id int,
datetime timestamp,
complete boolean
);

CREATE TABLE users (
id serial PRIMARY KEY,
name varchar(10),
password varchar(255) NOT NULL,
mail_address varchar(255) NOT NULL ,
last_login timestamp NOT NULL,
fcm_token varchar(255)
);

CREATE TABLE tag (
id serial PRIMARY KEY,
title varchar(20),
color varchar(7),
user_id int,
on_delete boolean DEFAULT false NOT NULL
);

INSERT INTO users (name, password, mail_address, last_login) VALUES ('yoshino', '$2b$12$qtcq4AsbSuAmahIY6jgSPeMA5/dxpA8zfeFsguuJAoyaYYJeQ4LfS', 'test@gmail.com', '2020-09-27 00:00:00.000000');
INSERT INTO tag (title, color, user_id) VALUES ('life', '#008080', 1);
INSERT INTO tag (title, color, user_id) VALUES ('家', '#008080', 2);
INSERT INTO remainder (contents, user_id, tag_id, datetime, complete) VALUES ('getup!!', 1, 1, '2020-09-27 00:00:00.000000', False);
