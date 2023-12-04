CREATE DATABASE IF NOT EXISTS cschat;

USE cschat;

CREATE TABLE IF NOT EXISTS member(
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(256),
    entry_year INT,
    entry_semester VARCHAR(6),
    email VARCHAR(256) UNIQUE,
    password VARCHAR(256)
);

INSERT INTO
    member (full_name, entry_year, entry_semester, email, password)
VALUES
    (
        "Yeonkyung Ha",
        "2021",
        "Spring",
        "ha.yeonkyung@stonybrook.edu",
        ""
    );

CREATE TABLE IF NOT EXISTS profile(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(256) UNIQUE,
    image VARCHAR(256),
    message VARCHAR(256),
    courses VARCHAR(256)
);

INSERT INTO
    profile (email, image, message, courses)
VALUES
    (
        "ha.yeonkyung@stonybrook.edu",
        "./src/images/profile_image.png",
        "I can do all this through him who gives me strength.",
        "CSE300, CSE310, CSE316, CSE373"
    );

CREATE TABLE IF NOT EXISTS groupchat(
    id INT AUTO_INCREMENT PRIMARY KEY,
    courses VARCHAR(6) UNIQUE
);

INSERT INTO groupchat (courses) VALUES ('CSE101');
INSERT INTO groupchat (courses) VALUES ('CSE114');
INSERT INTO groupchat (courses) VALUES ('CSE214');
INSERT INTO groupchat (courses) VALUES ('CSE215');
INSERT INTO groupchat (courses) VALUES ('CSE216');
INSERT INTO groupchat (courses) VALUES ('CSE220');
INSERT INTO groupchat (courses) VALUES ('CSE300');
INSERT INTO groupchat (courses) VALUES ('CSE303');
INSERT INTO groupchat (courses) VALUES ('CSE310');
INSERT INTO groupchat (courses) VALUES ('CSE312');
INSERT INTO groupchat (courses) VALUES ('CSE316');
INSERT INTO groupchat (courses) VALUES ('CSE320');
INSERT INTO groupchat (courses) VALUES ('CSE373');
INSERT INTO groupchat (courses) VALUES ('CSE416');
