import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ServiceBase {

    protected urlBase: string;
    protected module: string;

    constructor(urlBase: string, module: string, protected _httpClient: HttpClient) {
        this.urlBase = urlBase;
        this.module = module;
    }

    protected getPartialUrl(): string {
        return `${this.urlBase}/${this.module}`;
    }

}