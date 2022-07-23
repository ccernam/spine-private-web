import { EventEmitter } from "@angular/core";

export interface DatatableColumn {
   name: string,
   title: string,
   width: number,
   class?: string,
   custom?: DatatableColumnCustom,
}

export interface DatatableAction {
   name: string,
   icon: string,
   width: number,
   title?: string
}

export interface DatatableColumnCustom {
   name: string,
   class?: string,
   type?: DatatableColumnType,
   values?: DatatableColumnCustomValue[],
}

export interface DatatableColumnCustomValue {
   value: any,
   class?: string,
}

export enum DatatableColumnType {
   badge = 0,
   input = 1,
}
