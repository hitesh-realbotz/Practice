
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
-- is not null;

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
where order_time between '2023-01-01' AND '2023-01-31 23:59:59.999999'
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
select * from customers limit 5;			-- count
select * from customers limit 5 offset 5;  	-- count offset offset_count
select * from customers limit 12, 3;		-- offset_count, count


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
select distinct customer_id, product_id from orders 
where order_time between '2023-02-01' and '2023-02-28 23:59:59.999999' order by customer_id;
select customer_id, product_id, order_time from orders 
where product_id = 3 and order_time between '2023-02-01' and '2023-02-28 23:59:59.999999' 
order by order_time limit 4;

select coffee_origin from products;
select distinct coffee_origin from products;
select distinct coffee_origin as Country, id as `Product Id` from products;
select distinctrow coffee_origin, id from products;

select distinct last_name from customers order by last_name;

select o.id as orderId, p.name, o.order_time from orders as o 
inner join products p 
on o.product_id = p.id
where o.product_id = 5
order by o.order_time;

update orders set customer_id = null where id in (1,3,5);
select * from orders order by customer_id;
select * from customers;
select * from products;

select o.*, c.* from orders as o
left join customers c on o.customer_id = c.id
order by o.order_time;

select o.*, c.* from customers c
left join orders o on o.customer_id = c.id
-- where o.id between 1 and 10
order by o.id;

select o.*, c.* from customers c
right join orders o on o.customer_id = c.id
-- where o.id between 1 and 10
order by o.id;
select p.name, p.price, c.first_name, c.last_name, o.order_time from products p
join orders o on p.id = o.product_id
join customers c on c.id = o.customer_id
where c.last_name = 'Martin'
order by o.order_time;

select o.id, c.phone_number from orders as o
 join customers c on o.customer_id = c.id
where o.product_id = 4
order by o.order_time;
select p.name, o.order_time  from orders as o
join products p on o.product_id = p.id
where p.name = 'filter' and o.order_time between '2023-01-01' and '2023-03-31 23:59:59.9999'
order by o.order_time;

select p.name, p.price, o.order_time  from orders as o
join products p on o.product_id = p.id
join customers c on o.customer_id = c.id
where c.gender = 'F' 
and o.order_time between '2023-01-01' and '2023-01-31 23:59:59.9999'
order by o.order_time;

SET sql_safe_updates = false;
SET sql_safe_updates = true;

