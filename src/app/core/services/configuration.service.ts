import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { OptionDto } from "../dtos/configuration/option.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class ConfigurationService extends ServiceBase{
    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, "configuration", _httpClient)
    }

    public findSortedOptions(applicationId?:number) : Observable<OptionDto[]>{
        if (applicationId == null){
            applicationId = -1
        }        
        return this._httpClient.get<OptionDto[]>(`${this.getPartialUrl()}/option/${ applicationId }`);
    }

    public findOptions(parameters?: { id?: number, status?: number}) : Observable<OptionDto[]>{
        if (parameters == null){
            parameters = {};
        }
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString());      
        return this._httpClient.get<OptionDto[]>(`${this.getPartialUrl()}/option/`, { params: queryString });
    }
}