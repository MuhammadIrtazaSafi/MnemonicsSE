# CREATE SCRIPT

CREATE TABLE word_objs (word_id SERIAL PRIMARY KEY, word VARCHAR(200) NOT NULL, definition VARCHAR(200) NOT NULL, mnemonic VARCHAR(200), lat DECIMAL, long DECIMAL);
CREATE TABLE users (user_id SERIAL PRIMARY KEY, f_name VARCHAR(20) NOT NULL, l_name VARCHAR(20) NOT NULL, username VARCHAR(20) UNIQUE NOT NULL, hash VARCHAR(60), salt VARCHAR(50));
CREATE TABLE user_words (user_id INTEGER, word_id INTEGER);
CREATE TABLE word_ratings(word_id INTEGER, rating INTEGER, total_votes INTEGER);
CREATE TABLE session ("sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;