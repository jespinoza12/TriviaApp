use Time4Trivia;

INSERT INTO Questions (question) VALUES ('What is the capital of the United States?');

SET @questionId = LAST_INSERT_ID();

INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Washington D.C.', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'New York', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Los Angeles', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Chicago', false);

INSERT INTO Questions (question) VALUES ('What is the largest planet in our solar system?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Jupiter', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Saturn', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Neptune', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Uranus', false);

INSERT INTO Questions (question) VALUES ('Which famous playwright wrote "Romeo and Juliet"?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'William Shakespeare', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Charles Dickens', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Jane Austen', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mark Twain', false);

INSERT INTO Questions (question) VALUES ('What is the largest ocean on Earth?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Pacific Ocean', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Atlantic Ocean', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Indian Ocean', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Arctic Ocean', false);

INSERT INTO Questions (question) VALUES ('Which famous scientist developed the theory of evolution by natural selection?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Charles Darwin', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Isaac Newton', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Albert Einstein', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Marie Curie', false);

INSERT INTO Questions (question) VALUES ('What is the smallest bone in the human body?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Stapes (in the ear)', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Femur', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Radius', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Tibia', false);

INSERT INTO Questions (question) VALUES ('In which year did World War I end?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, '1918', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, '1945', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, '1914', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, '1939', false);

INSERT INTO Questions (question) VALUES ('Which planet is known as the "Morning Star" or the "Evening Star" in our solar system?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Venus', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mercury', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mars', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Jupiter', false);

INSERT INTO Questions (question) VALUES ('What is the chemical symbol for the element gold?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Au', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Ag', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Fe', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Cu', false);

INSERT INTO Questions (question) VALUES ('Which famous painting is known for its mysterious smile?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mona Lisa', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Starry Night', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'The Persistence of Memory', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'The Scream', false);

INSERT INTO Questions (question) VALUES ('Which gas do plants use for photosynthesis?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Carbon Dioxide (CO2)', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Oxygen (O2)', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Nitrogen (N2)', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Hydrogen (H2)', false);

INSERT INTO Questions (question) VALUES ('Which famous scientist developed the laws of motion and universal gravitation?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Isaac Newton', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Albert Einstein', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Charles Darwin', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Galileo Galilei', false);

INSERT INTO Questions (question) VALUES ('What is the largest land animal in the world?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'African Elephant', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, answer, false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Giraffe', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Rhinoceros', false);

INSERT INTO Questions (question) VALUES ('In which country is the Great Barrier Reef located?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Australia', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Brazil', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'India', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Canada', false);

INSERT INTO Questions (question) VALUES ('What is the chemical symbol for the element oxygen?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'O', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Ox', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'O2', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Oi', false);

INSERT INTO Questions (question) VALUES ('Which famous artist is known for painting "The Starry Night"?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Vincent van Gogh', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Leonardo da Vinci', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Pablo Picasso', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, answer, false);

INSERT INTO Questions (question) VALUES ('What is the smallest planet in our solar system?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mercury', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Venus', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Mars', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Pluto', false);

INSERT INTO Questions (question) VALUES ('Which natural disaster is measured on the Richter scale?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Earthquake', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Tornado', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, answer, false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Hurricane', false);

INSERT INTO Questions (question) VALUES ('Which planet is known as the "Blue Planet" due to its abundant water?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Earth', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Uranus', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Neptune', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Saturn', false);

INSERT INTO Questions (question) VALUES ('Which famous physicist developed the theory of general relativity?');
SET @questionId = LAST_INSERT_ID();
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Albert Einstein', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Isaac Newton', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, answer, false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Nikola Tesla', false);

insert into Users  (username, password, email, firstname, lastname) values ('admin', '$2b$10$8Zq3JH4WY6CRwQmitid6V.9oFlM/RKo3ATcXqGWdoXoW14SmAJ7d6', 'admin@test.com', 'admin', 'admin');
insert into Users (username, password, email, firstname, lastname) values ('test', '$2b$10$GlNz68MNngzHKC1Vc4FaDu2zRGnFqXvt3Q69ke1OAnJF9Ml1l/jBm', 'test@test.com', 'test', 'test');
insert into Users (username, password, email, firstname, lastname) values ('phil', '$2b$10$GlNz68MNngzHKC1Vc4FaDu2zRGnFqXvt3Q69ke1OAnJF9Ml1l/jBm', 'phil@gmail.com', 'Phil', 'Philerton');

insert into Roles (Role, RoleDescription) values ('user', 'standard user role');
insert into Roles (Role, RoleDescription) values ('admin', 'site admins');

set @userId = (select UserId from Users where username = 'test');
set @roleId = (select RoleId from Roles where Role = 'user');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

set @userId = (select UserId from Users where username = 'phil');
set @roleId = (select RoleId from Roles where Role = 'user');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

set @userId = (select UserId from Users where username = 'admin');
set @roleId = (select RoleId from Roles where Role = 'admin');
insert into UserRoles (UserId, RoleId) values (@userId, @roleId);

