CREATE TABLE words (word_id SERIAL PRIMARY KEY, word VARCHAR(200) NOT NULL, def VARCHAR(200) NOT NULL);
CREATE TABLE users (user_id SERIAL PRIMARY KEY, f_name VARCHAR(20) NOT NULL, l_name VARCHAR(20) NOT NULL, username VARCHAR(20) NOT NULL UNIQUE, hash VARCHAR(60) NOT NULL, salt VARCHAR(50) NOT NULL);
CREATE TABLE mnemonics (mn_id SERIAL PRIMARY KEY, word_id INTEGER references words(word_id), user_id INTEGER references users(user_id), mnemonic VARCHAR(200) NOT NULL, lat DECIMAL, long DECIMAL, rating INTEGER);
CREATE TABLE session ("sid" varchar NOT NULL COLLATE "default", "sess" json NOT NULL, "expire" timestamp(6) NOT NULL) WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;