import { Constants } from "./constants";

export class BookParams {
    minPrice: number;
    maxPrice: number;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;

    constructor(sortBy?: string, sortOrder?:string, minPrice?: number, maxPrice?:number, pageNumber?: number, pageSize?:number) {
        this.minPrice = minPrice || Constants.minPrice;
        this.maxPrice = maxPrice || Constants.maxPrice;
        this.pageNumber = pageNumber || Constants.pageNumber;
        this.pageSize = pageSize || Constants.pageSize;
        this.sortBy = sortBy || Constants.sortByTitle;
        this.sortOrder = sortOrder || Constants.sortOrderAsc;
    }
}
// export class PageParams {
//     static pageNumber = 1;
//     static pageSize = 5;
// }
// export class Constants {
//     static minPrice = 1;
//     static maxPrice = 0;

//     static pageNumber = 1;
//     static pageSize = 5;

//     static sortByTitle = "Title";
//     static sortByPrice = "Price";
//     static sortByAuthor = "Author";
//     static sortOrderAsc = "Ascending";
//     static sortOrderDsc = "Descending";
// }