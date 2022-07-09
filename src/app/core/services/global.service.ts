import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor() { }

    getStatusClass(status: number) {
        return (status == 1 ? "badge badge-success" : "badge badge-danger");
    }

}