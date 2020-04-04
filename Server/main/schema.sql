CREATE TABLE courses (
  oid SERIAL PRIMARY KEY,
  cid INT,
  pid INT,
  course_name VARCHAR(255) UNIQUE,
  professor_name VARCHAR(255) UNIQUE,
  year_taught INT,
  course_rating FLOAT,
  course_level FLOAT[] DEFAULT ARRAY[]::FLOAT[],
  professor_rating FLOAT,
  professor_level FLOAT[] DEFAULT ARRAY[]::FLOAT[]
);

CREATE TABLE prof_names (
    pid SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE course_names (
    cid SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    reputation INT,
    bannedTime TIMESTAMP,
    prof_review_ids INT[] DEFAULT ARRAY[]::INT[],
    prof_like_ids INT[] DEFAULT ARRAY[]::INT[],
    course_review_ids INT[] DEFAULT ARRAY[]::INT[],
    course_like_ids INT[] DEFAULT ARRAY[]::INT[]
);

CREATE TABLE course_reviews (
    rid SERIAL PRIMARY KEY,
    cid INT REFERENCES course_names(cid),
    uid INT REFERENCES users(uid),
    review VARCHAR(255),
    rating FLOAT,
    likes INT,
    like_user_ids INT[] DEFAULT ARRAY[]::INT[],
    level FLOAT[] DEFAULT ARRAY[]::FLOAT[],
    date TIMESTAMP,
    name VARCHAR(255),
    user_name VARCHAR(255),
    prof_names VARCHAR(255),
	anony INT
);

CREATE TABLE professor_reviews (
    rid SERIAL PRIMARY KEY,
    pid INT REFERENCES prof_names(pid),
    uid INT REFERENCES users(uid),
    review VARCHAR(255),
    rating FLOAT,
    likes INT,
    level FLOAT[] DEFAULT ARRAY[]::FLOAT[],
    date TIMESTAMP,
    like_user_ids INT[] DEFAULT ARRAY[]::INT[],
    name VARCHAR(255),
    user_name VARCHAR(255),
    course_names VARCHAR(255),
	anony INT
);
