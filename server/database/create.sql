# CREATE SCRIPT

CREATE TABLE word_objs (word_id SERIAL PRIMARY KEY, word VARCHAR(200) NOT NULL, definition VARCHAR(200) NOT NULL, mnemonic VARCHAR(200), lat DECIMAL, long DECIMAL);
CREATE TABLE users (user_id SERIAL PRIMARY KEY, f_name VARCHAR(20) NOT NULL, l_name VARCHAR(20) NOT NULL, username VARCHAR(20) NOT NULL, hash VARCHAR(50), salt VARCHAR(50));
CREATE TABLE user_words (user_id INTEGER, word_id INTEGER);
CREATE TABLE word_ratings(word_id INTEGER, rating INTEGER, total_votes INTEGER);