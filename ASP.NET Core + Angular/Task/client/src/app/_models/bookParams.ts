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
        this.pageSize = pageSize || Constants.pageSizeOptions[4];
        this.sortBy = sortBy || Constants.sortByTitle;
        this.sortOrder = sortOrder || Constants.sortOrderAsc;
    }
}

