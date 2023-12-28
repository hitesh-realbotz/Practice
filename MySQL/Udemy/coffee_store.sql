
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
SET Coffee_origin = 'Sri Lanka' where id = 7;

update products set name = 'Filter2', Coffee_origin = 'Sri Lanka2' where Coffee_origin = 'Sri Lanka' ;


SET sql_safe_updates = false;
SET sql_safe_updates = true;

