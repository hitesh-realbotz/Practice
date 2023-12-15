import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Item } from "./item.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ItemsService } from "./items.service";
import { DataStorageService } from "../shared/data-storage.service";
import { UserService } from "../users/user.service";

@Injectable({ providedIn: 'root' })
export class ItemsResolverService implements Resolve<Item[]> {

    constructor(private dataStorageService: DataStorageService, private itemsService: ItemsService, private userService: UserService){ }
    

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]>  {
        const items = this.itemsService.getItems();
        console.log("item-Resolver ====>", items);
        console.log("!!item-Resolver ====>", !!items);
        // if (items) { 
        //     console.log('data will be fetched');
        //     this.dataStorageService.fetchItems();
        // } else {
        //     console.log('data not fetched');
        //     return items;
        // }
        if (items.length === 0 || !items ) { 
            console.log('data will be fetched');
            this.dataStorageService.fetchItems();
            
        } else {
            console.log('data not fetched'); 
            return items;
            
        }

       
    }

}