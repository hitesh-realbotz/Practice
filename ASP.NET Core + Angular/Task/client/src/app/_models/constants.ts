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
    
    static emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
    static passwordRegex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{4,}$/";


    static pageSizeOptions: number[] = [ 1, 2, 4, 5, 10];
    static sortOrderOptions: string[] = [Constants.sortOrderAsc, Constants.sortOrderDsc];
}