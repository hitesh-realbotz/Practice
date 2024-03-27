import { Constants } from "./constants";

export class OrderParams {
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;

    constructor(sortBy?: string, sortOrder?:string, pageNumber?: number, pageSize?:number) {
        this.pageNumber = pageNumber || Constants.pageNumber;
        this.pageSize = pageSize || Constants.pageSize;
        this.sortBy = sortBy || Constants.sortByDate;
        this.sortOrder = sortOrder || Constants.sortOrderDsc;
    }
}