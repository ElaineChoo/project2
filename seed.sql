\c project2

--populate users table with seed data
INSERT INTO users
    (username, email, password, img)
VALUES
    ('Admin', 'admin@aaa.co', '123456', 'https://avatars2.githubusercontent.com/u/35322830?s=460&v=4');

--populate questions table with seed data
INSERT INTO questions
    (userId, question, optA, optB, optC, optD, is_active)
VALUES
    ('1', 'How are you feeling today?', 'Great', 'Good', 'Can be Better', 'Cant wait for today to be over', 'N');