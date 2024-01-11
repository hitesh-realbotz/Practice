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

create table tableEmployees(
EmployeeId int primary key not null,
EmployeeName varchar(50) not null,
Phone int not null,
Salary Decimal(10,2) Default 3000.00,
Age int not null CHECk(Age>=18),
DepId int foreign key references Departments(DepId) not null  default 1,
);



drop table Departments;
drop table tableEmployees;
EXEC sp_rename 'tableEmployees', 'Employees';

alter table tableEmployees
add constraint U_Phone
Unique(Phone);
alter table tableEmployees
add constraint CHK_Age
Check(Age>=18);


alter table tableEmployees
drop constraint CHK_Age;


insert into Departments (DepId, DepartmentName) values (1,'IT');
insert into Departments (DepId, DepartmentName) values (2,'HR');
insert into Departments (DepId, DepartmentName) values (3,'FI');
insert into Departments (DepId, DepartmentName) values (4,'FM');

insert into tableEmployees (EmployeeId,EmployeeName,Phone,Salary, Age, DepId) values (115,'Emp115',48745665,45000,22,1);
insert into tableEmployees (EmployeeId,EmployeeName,Phone,Salary, Age, DepId) values (116,'Emp116',48745666,55000,20,2);

update tableEmployees
set EmployeeName = 'Employee115' where EmployeeId = 115;
update tableEmployees
set EmployeeName = 'Emp115', Age = 25 where EmployeeId = 115;


delete tableEmployees where EmployeeId = 115;
delete from Departments where DepId = 1;
select * from tableEmployees;
select* from Departments;

select EmployeeName as 'Emp Name' from tableEmployees;

select * from Departments where DepId between 1 and 3;

select * from Departments where DepId in (1,2,4);
select * from Departments where DepId between 1 and 3;

select DepId, DepartmentName,
case 
	when DepartmentName = 'IT' then 'Information Tech'
	when DepId = 2 then 'Non-IT'
	End
from Departments;

select DepId, DepartmentName,
case 
	when DepartmentName = 'IT' then 'Information Tech'
	when DepId = 2 then 'Non-IT'
	End DepLongName
from Departments;

select DepId, DepartmentName,
case 
	when DepartmentName = 'IT' then 'Information Tech'
	when DepId = 2 then 'Non-IT'
	else 'Admin'
	End
from Departments;

select DepId, DepartmentName,
case DepartmentName 
	when 'IT' then 'Information Tech'
	when 'HR' then 'Human Resource'
	else 'Admin'
	End DepFullName
from Departments;



Create Login NewLogin With Password = '123123'

Alter Login NewLogin With Name = NewLogin2
Alter Login NewLogin With Password = 'NewPassword'

Drop Login NewLogin2