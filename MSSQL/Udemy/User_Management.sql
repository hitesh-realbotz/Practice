use AdventureWorks2017;

select Name from table_1;

select * from table_1;

update table_1 set Id = 6 where Name = 'test2';

insert into table_1 (Id, Name) values(3,'test3');
insert into table_1 (Id, Name) values(4,'test4');


select P.* from sys.database_permissions P
Join sys.database_principals U 
On U.principal_id = P.grantee_principal_id
Where U.name = 'admin';