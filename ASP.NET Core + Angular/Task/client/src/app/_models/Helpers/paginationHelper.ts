import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "./pagination";
import { map } from "rxjs";

//Gets paginated result
export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient) {
  console.log("get Paginated = " + params.toString());
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
  return http.get<T>(url, { observe: 'response', params }).pipe(
    map(response => {
      if (response.body) {
        paginatedResult.result = response.body;
      }
      const pagination = response.headers.get('Pagination');
      if (pagination) {
        paginatedResult.pagination = JSON.parse(pagination);
      }
      return paginatedResult;
    })
  );
}

//Adds pageNumber & pageSize params
export function getPaginationHeaders(pageNumber: number, pageSize: number) {
  let params = new HttpParams();

  params = params.append('PageNumber', pageNumber);
  params = params.append('PageSize', pageSize);

  return params;
}