import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ApiResponseDto } from "../dtos/api-response.dto";
import { RoleDto } from "../dtos/security/role.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CommonService extends ServiceBase {

    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, "common", _httpClient)
    }

    public findCategory(parameters?: { id?: number, status?: number, reportingStatus?: number }): Promise<ApiResponseDto<RoleDto[]>> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<ApiResponseDto<RoleDto[]>>(`${this.getPartialUrl()}/category`, { params: queryString }).toPromise();
    }
}