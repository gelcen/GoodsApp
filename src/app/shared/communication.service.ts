import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Good } from "./good.model";

@Injectable({
    providedIn: 'root'
})
export class CommunicationService {
    private newGoodAddedSource = new Subject<Good>();
    private editGoodSource = new Subject<Good>();
    private updateGoodSource = new Subject<Good>();

    goodAdded$ = this.newGoodAddedSource.asObservable();
    editGood$ = this.editGoodSource.asObservable();
    updateGood$ = this.updateGoodSource.asObservable();

    goodAdded(good: Good): void {
        this.newGoodAddedSource.next(good);
    }

    editGood(good: Good): void {
        this.editGoodSource.next(good);
    }

    updateGood(good: Good): void {
        this.updateGoodSource.next(good);
    }
}