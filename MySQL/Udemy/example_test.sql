-- HOW TO DELETE TABLES FROM A DATABASE
 
CREATE DATABASE example;
 
USE example;
 
CREATE TABLE test (
id INT auto_increment PRIMARY KEY,
name VARCHAR(30),
age INT
);
 
DESCRIBE test;
SHOW TABLES;

DROP TABLE test;

INSERT INTO test (name, age) VALUES('Ben', 19), ('Simon', 28), ('Claire', 23);
SELECT * FROM test;

TRUNCATE TABLE test;

show tables;
drop table addresses;
drop table people;
drop table pets;

create table addresses(
		id int,
        house_number int,
        city varchar(20),
        postcode varchar(7)
	);
    
create table people(
		id int,
        first_name varchar(20),
        last_name varchar(20),
        address_id int
	);
create table pets(
	id int,
    name varchar(20),
    species varchar(20),
    owner_id int
);

alter table addresses ADD primary key (id);
alter table addresses drop primary key ;
alter table addresses modify id int;
alter table people add primary key (id);
alter table pets add primary key (id);

alter table people 
add constraint FK_PeopleAddress
foreign key (address_id) references addresses(id);

alter table people 
drop constraint FK_PeopleAddress,
drop index FK_PeopleAddress;

alter table people 
drop constraint FK_PeopleAddress;

alter table pets
add constraint u_species UNIQUE (species);

alter table pets
drop constraint u_species;

alter table pets
change species animal_type varchar(20);

alter table pets
change species `animal type` varchar(20);

alter table pets
rename column animal_type TO species;

alter table addresses
change column city city varchar(30);

alter table addresses
modify column city varchar(30);
desc addresses;
desc people;
desc pets;

alter table pets
add constraint FK_PetsOwner
foreign key (owner_id) references people(id);

alter table pets
drop constraint FK_OwnerId,
drop index FK_OwnerId;

alter table pets rename column name to first_name;

alter table pets
add primary key (id);

alter table people add column email varchar(20);
alter table people add constraint u_email unique (email);
alter table addresses modify postcode char(7);