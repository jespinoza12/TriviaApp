-- This is the initial data script for Time 4 Trivia
-- Running this script will insert the intial data for the application
use Time4Trivia;

-- Insert Initial Data
INSERT INTO Questions (question) VALUES ('What is the capital of the United States?');

-- Retrieve the question ID that was automatically generated
SET @questionId = LAST_INSERT_ID();

-- Insert the answers into the Answers table, relating them to the question using the question ID
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Washington D.C.', true);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'New York', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Los Angeles', false);
INSERT INTO Answers (QuestionId, answer, correct) VALUES (@questionId, 'Chicago', false);

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

-- test data
-- select * from users;
-- select * from roles;
-- select * from userroles;

select u.userid, u.username, r.role
from users u 
	left join userroles ur on u.userid = ur.userid
	left join roles r on r.roleid = ur.roleid;