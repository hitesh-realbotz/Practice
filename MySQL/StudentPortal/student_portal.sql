
drop database student_portal;
create database student_portal;
show databases;
use student_portal;
show tables;

drop table students;
drop table Courses;
desc students;

create table students(
id int primary key auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
dob date not null,
address varchar(200),
gender enum('M', 'F','O'),
phone_number varchar(11),
email varchar(30) not null
);

create table courses(
id int primary key auto_increment,
course_name varchar(30) not null,
duration_years tinyint unsigned not null,
intake_capacity int unsigned not null
);


create table study_years(
id int primary key auto_increment,
nth_year tinyint unsigned not null
);


create table subjects(
id int primary key auto_increment,
sub_name varchar(60) not null,
marks tinyint unsigned not null
);


create table selected_courses (
id int primary key auto_increment,
student_id int not null,
course_id int not null,
foreign key (student_id) references students(id),
foreign key (course_id) references courses(id)
);


create table course_years(
id int primary key auto_increment,
course_id int not null,
year_id int not null,
foreign key (course_id) references courses(id),
foreign key (year_id) references study_years(id)
);


create table year_subjects(
id int primary key auto_increment,
course_year_id int not null,
sub_id int not null,
foreign key (course_year_id) references course_years(id),
foreign key (sub_id) references subjects(id)
);

create table obtained_marks(
id int primary key auto_increment,
marks tinyint unsigned not null,
student_id int not null,
year_subject_id int not null,
foreign key (student_id) references students(id),
foreign key (year_subject_id) references year_subjects(id)
);






select * from students;
select * from courses;
select * from selected_courses;
select * from study_years;
select * from subjects;
select * from course_years;
select * from year_subjects;
select * from obtained_marks;

select s.first_name, c.course_name from students s
join selected_courses sc on sc.student_id = s.id
join courses c on c.id = sc.course_id;

select s.first_name, c.* from students s
join selected_courses sc on sc.student_id = s.id
join courses c on c.id = sc.course_id;

select s.first_name, c.course_name, cy.id, sub.sub_name from students s
join selected_courses sc on sc.student_id = s.id
join courses c on c.id = sc.course_id
join course_years cy on cy.course_id = sc.course_id
join year_subjects ysub on ysub.course_year_id = cy.id
join subjects sub on sub.id = ysub.sub_id
order by s.first_name, cy.id
;

select s.first_name, c.course_name,  sub.sub_name as Subject,  sub.marks as `Total Marks` from students s
join selected_courses sc on sc.student_id = s.id
join courses c on c.id = sc.course_id
join course_years cy on cy.course_id = sc.course_id
join year_subjects ysub on ysub.course_year_id = cy.id
join subjects sub on sub.id = ysub.sub_id
order by s.id
;

select s.first_name, c.course_name, c.duration_years as Duration, cy.year_id as Year,  sub.sub_name as Subject, (select marks from obtained_marks where student_id = s.id and year_subject_id = ysub.id) as `Obtained Marks`,  sub.marks as `Total Marks` from students s
join selected_courses sc on sc.student_id = s.id
join courses c on c.id = sc.course_id
join course_years cy on cy.course_id = sc.course_id
join year_subjects ysub on ysub.course_year_id = cy.id
join subjects sub on sub.id = ysub.sub_id
order by s.id
;

select * from year_subjects;
select * from obtained_marks;



