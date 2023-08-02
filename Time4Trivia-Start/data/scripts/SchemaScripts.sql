-- This is the initial Schema Script for Time 4 Trivia
-- Running this script will drop the existing tables and then recreate them
create database if not exists Time4Trivia;

use Time4Trivia;

-- Drop existing tables if they exist
drop table if exists UserRoles;
drop table if exists Users;
drop table if exists Roles;
drop table if exists Questions;
drop table if exists Answers;

-- Create the Users table
create table if not exists Users(
    UserId int NOT NULL AUTO_INCREMENT,
    Username varchar(100) NOT NULL,
    Password varchar(100) NOT NULL,
    Email varchar(100) NOT NULL,
    FirstName varchar(100) NOT NULL,
    LastName varchar(100) NOT NULL,
    PRIMARY KEY (UserId),
    CONSTRAINT Users_UniqueEmail UNIQUE(Email),
    CONSTRAINT Users_UniqueUsername UNIQUE(Username)
);

-- Create the Roles table
create table if not exists Roles(
    RoleId int NOT NULL AUTO_INCREMENT,
    Role varchar(100) NOT NULL,
    RoleDescription text NOT NULL,
    PRIMARY KEY (RoleId),
    CONSTRAINT Roles_UniqueRole UNIQUE(Role)
);

-- Create the UserRoles table to establish a many-to-many relationship between Users and Roles
create table if not exists UserRoles(
    UserId int,
    RoleId int,
    PRIMARY KEY (UserId, RoleId),
    foreign key (UserId) references Users(UserId),
    foreign key (RoleId) references Roles(RoleId)
);

-- Create the Questions table
create table if not exists Questions(
    QuestionId int NOT NULL AUTO_INCREMENT,
    Question text NOT NULL,
    PRIMARY KEY (QuestionId)
);

-- Create the Answers table
create table if not exists Answers(
    AnswerId int NOT NULL AUTO_INCREMENT,
    QuestionId int NOT NULL,
    Answer text NOT NULL,
	Correct boolean NOT NULL,
    PRIMARY KEY (AnswerId),
    foreign key (QuestionId) references Questions(QuestionId)
);
