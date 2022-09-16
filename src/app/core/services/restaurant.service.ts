import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService extends ServiceBase {
    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, 'restaurant', _httpClient);
    }
}