use AdventureWorks2017;

select * from Person.Person;

select distinct PersonType from Person.Person;

select distinct PersonType, FirstName from Person.Person;

select * from Person.Person order by FirstName DESC ;

select * from Production.ProductInventory;
select SUM(Quantity) from Production.ProductInventory;

select Shelf, SUM(Quantity) from Production.ProductInventory
group by Shelf order by shelf;

select Shelf, SUM(Quantity) from Production.ProductInventory
group by Shelf having shelf = 'B' order by shelf;

select Shelf, SUM(Quantity) as qty from Production.ProductInventory
group by Shelf having SUM(Quantity) >= 5000 order by shelf;



select Shelf, SUM(Quantity) from Production.ProductInventory
where shelf = 'A'
group by Shelf;


select Shelf, SUM(Quantity) from Production.ProductInventory
group by Shelf having shelf = 'A';


select * from Person.Person where FirstName Like '__[am]%'

select * from Person.Person where FirstName Like '[abc]%'
select * from Person.Person where FirstName Like '[a-c]%'
select * from Person.Person where FirstName Like '[a-c, m-v]%'
select * from Person.Person where FirstName not Like '[a-c, m-v]%'


select Convert(int, 5.45);
select Convert(float, 5.45);
select Convert(varchar, 5.45);
select Convert(varchar(5), 5.45);
select CONVERT(datetime, '2020-01-07') as TextToDateTime;
select CONVERT(varchar, ( CONVERT(datetime, '2020-01-07')), 103 ) as TextToDateTime;


select Cast(5.45 as int);
select CAST(5.45 as float)

select Cast(5155.45 as varchar(3));

select firstName, LastName, ModifiedDate, 
Cast(ModifiedDate as varchar) from Person.Person;

select firstName, LastName, ModifiedDate, 
Cast(ModifiedDate as varchar(7)) from Person.Person;


select * from Production.Product;

select * from Sales.SalesOrderDetail;

select Name, SalesOrderDetailId from Production.Product as P
left join Sales.SalesOrderDetail as S 
on P.ProductId = S.ProductId;

select Name, SalesOrderDetailId from Production.Product as P
left join Sales.SalesOrderDetail as S 
on P.ProductId = S.ProductId
where S.SalesOrderDetailID is not null;

select Name, ISNULL( SalesOrderDetailId, 0) from Production.Product as P
left join Sales.SalesOrderDetail as S 
on P.ProductId = S.ProductId;

select JobTitle from HumanResources.Employee;

select JobTitle from HumanResources.Employee EM where EM.Gender = 'M';

select JobTitle from HumanResources.Employee EF where EF.Gender = 'F';

select JobTitle from HumanResources.Employee EM where EM.Gender = 'M'
Intersect
select JobTitle from HumanResources.Employee EF where EF.Gender = 'F';

select distinct EM.JobTitle from HumanResources.Employee EM
join HumanResources.Employee EF 
on EF.JobTitle = EM.JobTitle
and EM.Gender = 'M'
and EF.Gender = 'F';



select JobTitle from HumanResources.Employee EM where EM.Gender = 'M'
except
select JobTitle from HumanResources.Employee EF where EF.Gender = 'F';

update Person.StateProvince
set TerritoryID = 99
where CountryRegionCode = 'CA';


update Person.StateProvince
set TerritoryID = 99
where CountryRegionCode = 
( select CountryRegionCode from Person.StateProvince where CountryRegionCode = 'CA' ) ;

select TerritoryID  from Person.StateProvince where CountryRegionCode = 'CA';


select GETDATE();
select ISDATE('2024-02-29')
select ISDATE('2023-02-29')

select DATEPART(DAY, '2024-01-10 13:40:04.447')
select DATENAME(MONTH, '2024-01-10 13:40:04.447')
select DATENAME(WEEKDAY, '2024-01-10 13:40:04.447')

Select DATEADD(DAY, 5 , '2020-01-20')

Select DATEADD(YEAR, 5 , '2020-01-20')

Select DATEADD(MONTH, 5 , '2020-01-20')

select DATEDIFF(Year, '1989-01-01', '2020-01-10')
select DATEDIFF(Year, '2020-01-10', '1989-01-01') -- Negative
select DATEDIFF(MONTH, '1989-01-01', '2020-01-10')
select DATEDIFF(DAY, '1989-01-01', '2020-01-10')
select DATEDIFF(SECOND, '1989-01-01', '2020-01-10')

select CONVERT(varchar, GETDATE(),103)

select LEN('abcdefghijklmnopqrstuwvxyz')

select LEN('abcdxyz')
select TRIM('   abcd  xyz  ')
select LEFT('abcdxyz', 3)
select Right('abcdxyz', 3)

select UPPER('abcdxyz')

select Lower('aCDXyz')

select REVERSE('abcdxyz')
select REPLACE('abcdxyz', 'cd', 'dvd')
select SUBSTRING('abcdxyz', 3,2)

select ABS(-500)
select POWER(2,8)
select SQRT(64)
select RAND()
select floor(RAND()*10)
select ROUND(123.721,0)


select * from Person.Person;

select BusinessEntityID, FirstName, LastName from Person.Person;

update Person.Person
set FirstName = 'Terri' where BusinessEntityID = 2;

select * from Person.Person;

begin Tran

update Person.Person
set FirstName = 'Terri1' where BusinessEntityID = 2;
Save Tran first

update Person.Person
set FirstName = 'Terri2' where BusinessEntityID = 2;
Save Tran second

update Person.Person
set FirstName = 'Terri3' where BusinessEntityID = 2;
Save Tran third

update Person.Person
set FirstName = 'Terri4' where BusinessEntityID = 2;
Save Tran fourth

select * from Person.Person;

Rollback
Rollback Transaction second
Rollback Tran first
Rollback Tran third
commit

alter table Person.Person
alter column Title nvarchar(8) null;


select FirstName, LastName, EmailAddress from Person.Person P
join Person.EmailAddress E
on p.BusinessEntityID = E.BusinessEntityID

Create View VPersonWithEmail as 
select FirstName, LastName, EmailAddress from Person.Person P
join Person.EmailAddress E
on p.BusinessEntityID = E.BusinessEntityID;

select * from VPersonWithEmail;

Drop view VPersonWithEmail;

Create Sequence SequenceObject
Start With 1
Increment By 1

Select Next Value for SequenceObject

Select * from sys.sequences where name = 'SequenceObject'

Select current_value from sys.sequences where name = 'SequenceObject'

Alter Sequence SequenceObject
Restart with 1


Create Sequence MinMaxSeq
Start With 100
Increment By 20
MinValue 100
MaxValue 200

select next value for MinMaxSeq

Alter Sequence MinMaxSeq
Increment By 20
MinValue 100
MaxValue 200
Cycle 
