import { Injectable } from "@angular/core";
import { last } from "rxjs";

// @Injectable({ providedIn : 'root' }) //Loading Service by @Injectable
export class LoggingService {
    lastlog: string;

    printLog(message: string){
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message;
    }
}