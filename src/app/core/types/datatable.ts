import { EventEmitter } from "@angular/core";

export interface DatatableColumn {
   name: string,
   title: string,
   width?: number,
   custom?: DatatableColumnOption,
}

export interface DatatableAction {
   name: string,
   icon: string,
   width?: number,
}

export interface DatatableColumnOption {
   type?: DatatableColumnType,
   class?: string,
}

export enum DatatableColumnType {
   badge = 0,
   input = 1,
}