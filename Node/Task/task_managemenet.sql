drop database task_management;

create database task_management;

use task_management;

create table users (userId int primary key auto_increment, email varchar(30) unique not null, password varchar(10) not null);
select * from users;

create table tasks (id int primary key auto_increment, title varchar(30) not null, description varchar(500) not null, status varchar(15) not null, dueDate date not null, createdby int not null, createdDate date not null);

select * from tasks ;
select count(*) as `Total Tasks` from tasks;


delete from tasks where id in (102, 103);

drop table users;
drop table tasks;
