import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, catchError, map, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    error = new Subject<string>();

    constructor(private http: HttpClient) { }
    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http.post<{ name: string }>('https://ng-complete-guide-e082e-default-rtdb.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response' //default is body
            }).subscribe(responsedata => {
                console.log(responsedata);
                console.log(responsedata.body);
            }, error => {
                this.error.next(error.message);
            });
    }


    fetchPost() {
        console.log('fetchPost method called');

        let serachParams = new HttpParams();
        serachParams = serachParams.append('print','pretty');
        serachParams = serachParams.append('custom','key');

        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-e082e-default-rtdb.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({"Custome-Header" : "Hello..."}),
                    // params: new HttpParams().set('print','pretty'),
                    params: serachParams,
                })
            .pipe(
                // map( ( responseData ) => {
                // map( ( responseData: {[key:string]: Post} ) => {
                map(responseData => {
                    const postsArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postsArray.push({ ...responseData[key], id: key })
                        }
                    }
                    return postsArray;
                }),
                catchError(errorRes => {
                    return throwError(errorRes); //deprecated
                    // return throwError(() => new Error(errorRes)); //supported
                })
            )
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-e082e-default-rtdb.firebaseio.com/posts.json',
                {
                    observe: 'events',
                    responseType: 'json',
                }).pipe(tap(event => {
                    console.log(event);
                    if (event.type === HttpEventType.Sent) {
                        console.log("Sent type");
                    }
                    if(event.type === HttpEventType.Response){
                        console.log("event body : "+event.body);
                    }
                }));
    }
}