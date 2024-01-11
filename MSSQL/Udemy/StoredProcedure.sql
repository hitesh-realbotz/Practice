CREATE PROCEDURE HumanResources.GetAllGenderJobTitles @Gender1 nchar(1), @Gender2 nchar(1) 
as
select distinct EM.JobTitle from HumanResources.Employee EM
join HumanResources.Employee EF 
on EF.JobTitle = EM.JobTitle
and EM.Gender = @Gender1
and EF.Gender = @Gender2;
Go