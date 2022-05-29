CREATE TABLE users (
    id integer primary key auto_increment,
    username not null varchar(16) unique,
    password not null varchar(255),
    email not null varchar(255) unique,
    name not null varchar(255) ,
    surname not null varchar(255)
) Engine = InnoDB;

CREATE TABLE pref (
    user not null varchar(255),
    evento varchar(255),
    luogo varchar(255),
    data varchar(255),
    ora varchar(255),
    immagine varchar(255),
    info varchar(255)
) Engine = InnoDB;