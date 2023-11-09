import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, count, filter, interval, map } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  

  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription = interval(1000).subscribe(count=> {
    //   console.log(count);
    // });

    //  //Observable.create() => Deprecated
    //  const customIntervalObservable = Observable.create(observer => {
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        // if (count == 2) {
        if (count == 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Counter id is greater than 3'));
        }
        // count++; //uncomment to see count on console window
      }, 1000);
    });

    // //deprecated all signatures of subscribe() that take more than 1 argument.
    //   this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    //     console.log(data);
    //   }, 
    //   error => {
    //     console.log(error);
    //     alert(error.message);
    //   },
    //   () => { console.log('Completed!'); }
    // );
    // customIntervalObservable.map()
    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    } , map((data: number)=> {
      return 'Round: ' + (data+1);
    }))).subscribe({
      next(count) { console.log(count); },
      error(e) {
        console.log(e);
        alert(e.message);
      },
      complete() { console.log('Completed!');}
    });


    
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();

  }

  




}
