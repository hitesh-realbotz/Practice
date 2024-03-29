export class Constants {
    static minPrice = 0;
    static maxPrice = 0;

    static pageNumber = 1;
    static pageSize = 10;

    static sortByTitle = "Title";
    static sortByPrice = "Price";
    static sortByAuthor = "Author";
    static sortByDate = "Date";
    static sortById = "Id";
    static sortOrderAsc = "Ascending";
    static sortOrderDsc = "Descending";

    static defaultGender = "male";
    static otpLength = 6;
    
    static emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    static passwordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{8,}$/;


    static pageSizeOptions: number[] = [ 1, 2, 4, 5, 10];
    static sortOrderOptions: string[] = [Constants.sortOrderAsc, Constants.sortOrderDsc];
}