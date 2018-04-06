-- create survey questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    userId varchar (255),
    question varchar (500),
    optA varchar (500),
    optB varchar (500),
    optC varchar (500),
    optD varchar (500),
    is_active varchar (1)
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username varchar (255),
    email varchar (255),
    password varchar (255),
    img varchar (500)
);

--create answers table
CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id varchar (255),
    ans varchar (1)
);

