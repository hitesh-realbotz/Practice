Show databases;
create database cinema_booking_system;
use cinema_booking_system;

create table films (
id int primary key auto_increment,
name varchar(45) not null unique,
length_min int not null
);

select * from films;

create table customers(
 id int primary key auto_increment,
 first_name varchar(45),
 last_name varchar(45) not null,
 email varchar(45) not null unique
);

create table rooms (
 id int primary key auto_increment,
 name varchar(45) not null,
 no_seats int not null
);

create table screenings (
 id int primary key auto_increment,
 start_time datetime not null,
 film_id int not null,
 room_id int not null,
 foreign key (film_id) references films(id),
 foreign key (room_id) references rooms(id)
);

create table seats (
 id int primary key auto_increment,
 seat_row char(1) not null,
 number int not null,
 room_id int not null,
 foreign key (room_id) references rooms(id)
);

create table bookings (
 id int primary key auto_increment,
 screening_id int not null,
 customer_id int not null,
 foreign key (screening_id) references screenings(id),
 foreign key (customer_id) references customers(id)
);

create table reserved_seat (
 id int primary key auto_increment,
 booking_id int not null,
 seat_id int not null,
 foreign key (booking_id) references bookings(id),
 foreign key (seat_id) references seats(id)
);


show tables;
desc films;
desc customers;
desc rooms;
desc screenings;
desc seats;
desc bookings;
desc reserved_seat;

select * from films;
select * from customers;
select * from rooms;
select * from screenings;
select * from seats;
select * from bookings;
select * from reserved_seat;

select count(*) as Count from customers;
select count(*) from customers where last_name = "smith";
select count(*) from customers where first_name is null;
select count(last_name) from customers;
select last_name, first_name, count(last_name) from customers group by last_name, first_name;
select first_name, count(*) from customers group by first_name;
select count(first_name)  from customers;

select * from rooms;
select sum(no_seats) from rooms;
select sum(no_seats) from rooms where id > 1;
select sum(id) from rooms;

select * from films;
select max(length_min) from films;
select min(length_min) from films;
select avg(length_min) from films;
select avg(length_min) from films where length_min > 120;

select count(*) as `Total bookings` from bookings where customer_id = 10;

select count(*) as `Total Screenings` from screenings sc
join films fm on sc.film_id = fm.id 
where fm.name = "Blade Runner 2049" and
sc.start_time between '2022-10-01' and '2022-10-31 23:59:59.999999';

select count(distinct customer_id)  from bookings bk 
join  screenings sc on sc.id = bk.screening_id 
where sc.start_time between '2023-04-01' and '2023-04-30 23:59:59.999999';

select count(distinct customer_id)  from bookings bk 
join  screenings sc on sc.id = bk.screening_id 
where month(sc.start_time) = 4 and year(sc.start_time) = 2023  ;

select * from bookings order by customer_id;
select customer_id, screening_id, count(*) from bookings group by customer_id, screening_id order by customer_id;
select customer_id, count(screening_id) from bookings group by customer_id order by customer_id;

select f.name, s.start_time, c.last_name, c.first_name from films f
join screenings s on s.film_id = f.id
join bookings b on b.screening_id = s.id
join customers c on c.id = b.customer_id
group by f.name,s.start_time, c.last_name, c.first_name order by s.start_time
;

select b.customer_id, s.* from bookings b 
join screenings s on b.screening_id = s.id
where b.customer_id > 10;

select * from films;
select * from customers;
select * from rooms;
select * from screenings;
select * from seats;
select * from bookings;
select * from reserved_seat;

select b.customer_id, count(b.customer_id) from bookings b
join reserved_seat rs on rs.booking_id = b.id group by b.customer_id;

select f.name, f.length_min, count(s.film_id) from films f
join screenings s on s.film_id = f.id
where f.length_min > 120
group by f.name, f.length_min ;

select f.name, f.length_min,  count(s.film_id) from films f
join screenings s on s.film_id = f.id
where f.length_min > 120 and
year(s.start_time) = 2023 and month(s.start_time) = 01
group by f.name order by f.name;

select f.name, f.length_min, count(s.film_id) from films f
join screenings s on s.film_id = f.id
where year(s.start_time) = 2023 and month(s.start_time) = 01
group by f.name having f.length_min > 120 
order by f.name ;


select f.name from films f
where f.length_min > 120;


select b.customer_id,b.screening_id, count(b.customer_id) from bookings b
join reserved_seat rs on rs.booking_id = b.id 
group by b.customer_id, b.screening_id order by b.customer_id;



