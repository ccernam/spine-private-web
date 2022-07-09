import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor() { }

    getStatusClass(status: number): string {
        return (status == 1 ? "badge badge-success" : "badge badge-danger");
    }

    getStatuses(): Object[] {
        return [{ value: 1, display: "Activado" }, { value: 0, display: "Desactivado" }];
    }

    getReportingStatuses(): Object[] {
        return [{ value: 1, display: "Activado" }, { value: 0, display: "Desactivado" }];
    }

}