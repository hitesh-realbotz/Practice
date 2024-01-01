
drop database coffee_store;
show databases;
create database coffee_store;
use coffee_store;
show tables;

create table products ( 
		id int auto_increment primary key, 
        name varchar(30), 
        price decimal(3,2) 
	);
    
create table customers (
		id int auto_increment primary key,
        first_name varchar(30),
        last_name varchar(30),
        gender enum('M','F'),
        phone_number varchar(11)
);
desc products;
desc customers;
desc orders;

drop table customers;

create table orders (
		id int auto_increment primary key,
        product_id int,
        customer_id int,
        order_time datetime,
        foreign key (product_id) references products(id),
        foreign key (customer_id) references customers(id)
);

ALTER table products
ADD column Coffe_origin varchar(30);

ALTER table products
DROP column Coffe_origin ;

select * from products;
select * from customers;
select * from orders;

insert into products (name, price,coffe_origin) values ( 'Espresso', 2.50, 'Brazil');
insert into products (name, price,coffe_origin)
values ( 'Macchiato', 3.00, 'Brazil'), 
		( 'Cappuccino', 3.50, 'Costa Rica') ;
insert into products (name, price,coffe_origin)
values 	( 'Latte', 3.50, 'Indonesia'), 
		( 'Americano', 3.00, 'Brazil'), 
        ( 'Flat White', 3.50, 'Indonesia'), 
		( 'Filter', 3.00, 'India');
        
UPDATE products 
SET Coffee_origin = 'Sri Lanka', name = 'Filter' where id = 7;
UPDATE products 
SET Coffee_origin = 'Ethiopia', price = 3.25 where id = 5;
update products set name = 'Filter2' , Coffee_origin = 'Sri Lanka2' where Coffee_origin = 'Sri Lanka' ;

update products set Coffee_origin = 'Colombia' where Coffee_origin = 'Brazil' ;

select * from products;
select * from products 
WHERE coffee_origin = 'Colombia';
select * from products 
WHERE price = 3.00 AND coffee_origin = 'Colombia';
select * from products 
WHERE price = 3.00 OR coffee_origin = 'Colombia';

select * from products 
WHERE price != 3.00;
-- WHERE price <>  3.00;

select * from products 
where name < 'D';

select * from customers
where phone_number 
is null; 
-- is no- t null;

select first_name, phone_number from customers
where gender = 'F' AND last_name = 'Bluth';
select first_name, phone_number from customers
where gender = 'M' AND phone_number is null; 

select * from customers
Where last_name IN ('Taylor', 'Bluth', 'Armstrong');
select * from customers
Where last_name NOT IN ('Taylor', 'Bluth', 'Armstrong');
select * from customers
Where last_name between 'A' and 'L';

select * from orders;
select * from orders
where order_time between '2022-03-01' AND '2022-03-31 23:59:59.999999' 
AND customer_id in (19,20,21,24) ;

select * from orders
where customer_id between 3 and 7 ;

select * from customers;
select * from customers
where last_name LIKE 'W%';
select * from customers
where first_name LIKE '%o%';
select * from customers
where first_name LIKE '_o%';

select * from products;
select * from products
where price LIKE '3%';
select * from products
where price LIKE '%.5%';

select * from products
order by price asc;
select * from products
order by price desc;

select * from customers;
select * from customers
where last_name = 'Bluth'
order by last_name, first_name;

select * from orders;
select * from orders 
order by order_time ;



select * from orders 
where year(order_time) = 2023 AND month(order_time) = 2
AND customer_id IN (19,20,21,24);

SET sql_safe_updates = false;
SET sql_safe_updates = true;

