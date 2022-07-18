import { EventEmitter } from "@angular/core";

export interface DatatableColumn {
   name: string,
   title: string,
   width: number,
}

export interface DatatableAction {
   name: string,
   icon: string,
}