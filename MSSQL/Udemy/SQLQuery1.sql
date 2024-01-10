create database TEST2;
alter database TEST3 modify name = TEST1;

drop database TEST2;
use Test1;

drop database Company;
create database Company;

use Company;
create table Departments (
DepId int primary key not null,
DepartmentName varchar(50) not null
);
drop table Departments;
drop table tableEmployees;
create table tableEmployees(
EmployeeId int primary key not null,
EmplyeeName varchar(50) not null,
Phone int not null,
Salary Decimal(10,2) Default 3000.00,
Age int not null CHECk(Age>=18),
DepId int foreign key references Departments(DepId) not null ,
);


EXEC sp_rename 'tableEmployees', 'Employees';

alter table tableEmployees
add constraint U_Phone
Unique(Phone);
alter table tableEmployees
add constraint CHK_Age
Check(Age>=18);


alter table tableEmployees
drop constraint CHK_Age;