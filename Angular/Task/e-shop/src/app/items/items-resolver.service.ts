import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Item } from "./item.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ItemsService } from "./items.service";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({ providedIn: 'root' })
export class ItemsResolverService implements Resolve<Item[]> {

    constructor(private dataStorageService: DataStorageService, private itemsService: ItemsService){ }
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]> {
    //     throw new Error("Method not implemented.");
    // }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]>  {
        const items = this.itemsService.getItems();
        
        if (!items) { 
            console.log('data will be fetched');
            this.dataStorageService.fetchItems();
        } else {
            console.log('data not fetched');
            return items;
        }

       
    }

}