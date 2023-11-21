import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient,
    private postsService: PostsService) { }
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe( errorMessage => {
      this.error = errorMessage;
    });
    // this.fetchPost(); // local method

    this.isFetching = true;
    this.postsService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
    
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    // this.http.post<{name: string}>('https://ng-complete-guide-e082e-default-rtdb.firebaseio.com/posts.json',
    //   postData).subscribe(responsedata => {
    //     console.log(responsedata);
    //   });
    this.postsService.createAndStorePost(postData.title, postData.content);    
    
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPost(); // local method

    this.isFetching = true;
    this.postsService.fetchPost().subscribe(posts => {
      this.isFetching = false;
      console.log('from onFetchPosts() : ');
      console.log( posts);
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(()=> {
      this.loadedPosts = [];
    });
  }

  private fetchPost() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-e082e-default-rtdb.firebaseio.com/posts.json')
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
        })
      )
      .subscribe(posts => {
        this.isFetching = false;
        console.log(posts);
        this.loadedPosts = posts;
      })
  }

  onHandleError(){
    this.error= null;
  }
}
