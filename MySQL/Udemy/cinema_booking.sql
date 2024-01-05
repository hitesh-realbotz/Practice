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

select f.name, s.start_time, c.last_name, c.first_name from films f join screenings s on s.film_id = f.id join bookings b on b.screening_id = s.id join customers c on c.id = b.customer_id group by f.name,s.start_time, c.last_name, c.first_name order by s.start_time;

select b.customer_id, s.* from bookings b join screenings s on b.screening_id = s.id where b.customer_id > 10;

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


select f.name, f.length_min from films f
where f.length_min > 120;


select b.customer_id,b.screening_id, count(b.customer_id) from bookings b
join reserved_seat rs on rs.booking_id = b.id 
group by b.customer_id, b.screening_id order by b.customer_id;


select id, start_time, film_id from screenings 
where film_id in ( select id from films where length_min > 120 ) ;


select id, first_name, last_name, email  from customers
where id in ( select customer_id from bookings where screening_id = 1 );

select max(seat_count) from 
( select booking_id, count(seat_id) as seat_count from reserved_seat group by booking_id ) b; 

select * from bookings;
select screening_id, customer_id from bookings order by screening_id;
select screening_id, customer_id, (select count(seat_id) from reserved_seat where booking_id = b.id) as Count
 from bookings b order by screening_id;

select count(seat_id) from reserved_seat group by booking_id ;



select name, length_min from films
where length_min > ( select avg(length_min) from films ) ;

select max(Count), min(Count) from 
( select count(film_id) as Count from screenings group by film_id order by film_id ) r ;

select * from films;
select * from screenings;
select ( select name from films where id = film_id ), film_id, count(*) as Count from screenings group by film_id ;

select name, id, ( select count(*) from screenings where film_id = f.id ) from films f order by id;

select * from customers;

select concat(first_name,' ', last_name) as `Full Name` from customers;
select concat(first_name, last_name) as `Full Name` from customers;
select concat_ws(' ',first_name, last_name) as `Full Name` from customers;

-- substring(string, start, length)
select substring("Example",3,3) as Sub;
select substring("Example",3) as Sub;
select substring("Example",1,3) as Sub;
select substring("Example",-2,3) as Sub;
select substring("Example",-6,3) as Sub;

select * from films;
select substring(name, 1 , 4) as short_name from films;
select substring(name, 5 , 6) as short_name from films;
select name from films;
select lower(name) from films;
select upper(name) from films;
select concat(name, length_min) from films;
select concat_ws(" - ",name, length_min) from films;
select substring(email,5) from customers;
select substring(email,-5) from customers;
select ifnull((first_name), 'N/A'), upper(last_name) from customers where last_name = 'Smith';
select (first_name), upper(last_name) from customers where last_name = 'Smith';
select substr(name, -3) from films; 
select concat_ws("   ", substring(first_name, 1,3), substring(last_name,1,3)) from customers;


select * from screenings;
select film_id, start_time from screenings where date(start_time) = '2022-06-18';
select * from screenings where date(start_time) between '2023-03-06' and '2023-03-13';
select * from screenings where year(start_time) = 2022 and month(start_time) = 10;
select start_time from screenings;
select date(start_time) from screenings;
select  year(start_time) from screenings;
select month(start_time) from screenings;
select start_time, day(start_time) from screenings;
select start_time, dayname(start_time) from screenings;
select start_time, week(start_time) from screenings;
select start_time, dayofyear(start_time) from screenings;
select start_time, month(start_time), monthname(start_time) from screenings;
select start_time, week(start_time), weekofyear(start_time), weekday(start_time), dayofweek(start_time) from screenings;

SELECT WEEKDAY(CURDATE()), dayofweek(curdate());
-- weekday starts from monday with 0 while dayofweek starts from sunday with 1
select date('2024-01-31');
select curdate();

select * from screenings;
select film_id, count(*) from screenings group by film_id order by film_id;
select max( count) from
(select film_id, count(*) as count from screenings group by film_id order by film_id) b;

select f.name, count(s.film_id) as count from screenings s
join films f on f.id = s.film_id
group by s.film_id
order by count desc
limit 1;

select f.name, count(s.film_id) as count from screenings s
join films f on f.id = s.film_id
group by s.film_id
having count = (select max( count) from
(select film_id, count(*) as count from screenings group by film_id order by film_id) b)
;


select * from films;
select * from customers;
select * from rooms;
select * from screenings;
select * from seats;
select * from bookings;
select * from reserved_seat;

select s.id from films f 
join screenings s on s.film_id = f.id where f.name = 'Jigsaw' and year(start_time) = 2022 and  month(start_time) = 5
;
select count(*) from bookings where screening_id in 
(select s.id from films f 
join screenings s on s.film_id = f.id where f.name = 'Jigsaw' 
and year(start_time) = 2022 and  month(start_time) = 5)
;
select count(*) from bookings b
join screenings s on s.id = b.screening_id
join films f on f.id = s.film_id
where f.name = 'Jigsaw' 
and year(start_time) = 2022 and  month(start_time) = 5;


select c.first_name, c.last_name, count(b.id) as no_bookings from bookings b
join customers c on c.id = b.customer_id
group by c.first_name, c.last_name
order by no_bookings desc limit 5 ;

