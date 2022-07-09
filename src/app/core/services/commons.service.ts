import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ApiResponseDto } from "../dtos/api-response.dto";
import { CategoryDto } from "../dtos/commons/category.dto";
import { RoleDto } from "../dtos/security/role.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CommonsService extends ServiceBase {

    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, "commons", _httpClient)
    }

    public findCategory(parameters?: { id?: number, status?: number, reportingStatus?: number }): Observable<CategoryDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<CategoryDto[]>(`${this.getPartialUrl()}/category`, { params: queryString });
    }

    public createCategory(categoryDto: CategoryDto): Observable<ApiResponseDto<CategoryDto>> {
        return this._httpClient.post<ApiResponseDto<CategoryDto>>(`${this.getPartialUrl()}/category`, categoryDto);
    }

    public editCategory(categoryDto: CategoryDto): Observable<ApiResponseDto<CategoryDto>> {
        return this._httpClient.put<ApiResponseDto<CategoryDto>>(`${this.getPartialUrl()}/category`, categoryDto);
    }
}