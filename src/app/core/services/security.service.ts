import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RoleDto } from "../dtos/security/role.dto";
import { OptionDto } from "../dtos/configuration/option.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class SecurityService extends ServiceBase {

    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, "security", _httpClient)
    }

    public findRole(parameters?: { id?: number, status?: number, reportingStatus?: number }): Observable<RoleDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<RoleDto[]>(`${this.getPartialUrl()}/role`, { params: queryString });
    }

    public createRole(role: RoleDto): Observable<RoleDto> {
        return this._httpClient.post<RoleDto>(`${this.getPartialUrl()}/role`, role);
    }

    public editRole(role: RoleDto): Observable<RoleDto> {
        return this._httpClient.put<RoleDto>(`${this.getPartialUrl()}/role`, role);
    }

    public findOptions(roleId: number, applicationId: number): Observable<OptionDto[]> {
        let queryParams : HttpParams = new HttpParams()
            .set("roleId", roleId.toString())
            .set("applicationId", applicationId.toString());
        return this._httpClient.get<OptionDto[]>(`${this.getPartialUrl()}/role/option`, { params: queryParams});
    }
}