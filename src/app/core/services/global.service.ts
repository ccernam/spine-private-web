import { Injectable } from "@angular/core";
import { ModalResultModel } from "../models/modal-result.model";
import { SelectItemModel } from "../models/select-item.model";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor() { }

    getStatusClass(status: number): string {
        return (status == 1 ? "badge badge-success" : "badge badge-danger");
    }

    getStatuses(): SelectItemModel[] {
        let activated = new SelectItemModel();
        activated.value = 1;
        activated.display = "Activado";
        let deactivated = new SelectItemModel();
        deactivated.value = 2;
        deactivated.display = "Desactivado";
        return [activated, deactivated];
    }

    getReportingStatuses(): SelectItemModel[] {
        let activated = new SelectItemModel();
        activated.value = 1;
        activated.display = "Activado";
        let deactivated = new SelectItemModel();
        deactivated.value = 2;
        deactivated.display = "Desactivado";
        return [activated, deactivated];
    }

    getSuccessModalResult<T>(data: T): ModalResultModel<T> {
        let result: ModalResultModel<T> = new ModalResultModel();
        result.success = true;
        result.data = data;
        return result;
    }

    getCloseModalResult(): ModalResultModel<object> {
        let result: ModalResultModel<object> = new ModalResultModel();
        result.success = false;
        return result;
    }
}