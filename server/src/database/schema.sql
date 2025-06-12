-- Active: 1747815168837@@127.0.0.1@3306@lebiencoin
DROP DATABASE IF EXISTS lebiencoin;

CREATE DATABASE lebiencoin;

USE lebiencoin;

CREATE TABLE user (
    user_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL UNIQUE KEY,
    email VARCHAR(255) NOT NULL UNIQUE KEY,
    password CHAR(64) NOT NULL,
    user_town VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE category (
    category_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL UNIQUE KEY
);

CREATE TABLE advert (
    advert_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(2500) NOT NULL,
    price INT UNSIGNED NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    last_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    category_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

CREATE TABLE message (
    message_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    message_content VARCHAR(2500) NOT NULL,
    send_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    sender_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES user (user_id),
    recipient_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (recipient_id) REFERENCES user (user_id),
    advert_id INT UNSIGNED,
    FOREIGN KEY (advert_id) REFERENCES advert (advert_id)
);

CREATE TABLE image (
    image_id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(2000) NOT NULL,
    advert_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (advert_id) REFERENCES advert (advert_id)
);