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
name varchar(10)
);

CREATE TABLE tag (
id serial PRIMARY KEY,
title varchar(20),
color varchar(6),
user_id int
);

INSERT INTO users (name) VALUES ('yoshino');
INSERT INTO tag (title, color, user_id) VALUES ('life', '008080', 1);
INSERT INTO remainder (contents, user_id, tag_id, datetime, complete) VALUES ('getup!!', 1, 1, '2020-09-27 00:00:00.000000', False)
 );
