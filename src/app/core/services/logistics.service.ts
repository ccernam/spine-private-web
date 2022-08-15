import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ProductMovementDetailDto } from "../dtos/logistics/product-movement-detail.dto";
import { ProductMovementDto } from "../dtos/logistics/product-movement.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class LogisticsService extends ServiceBase {
    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, 'logistics', _httpClient);
    }

    public findProductMovementHeader(parameters?: { companyId?:number, branchId?:number, warehouseId?:number, type?:number, reason?:number, supplierId?:number, status?:number, saleDocumentId?:number, buyDocumentId?:number, issueDate?:string }) : Observable<ProductMovementDto[]> {
        if (parameters == null)
        {
            parameters = {};
        }       
        

        let queryString : HttpParams = new HttpParams()
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("branchId", (parameters.branchId ?? -1).toString())
            .set("warehouseId", (parameters.warehouseId ?? -1).toString())
            .set("type", (parameters.type ?? -1).toString())
            .set("reason", (parameters.reason ?? -1).toString())
            .set("supplierId", (parameters.supplierId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("saleDocumentId", (parameters.saleDocumentId ?? -1).toString())
            .set("buyDocumentId", (parameters.buyDocumentId ?? -1).toString())
            .set("issueDate", parameters.issueDate);

        if (parameters.issueDate == undefined)
        {
            queryString = new HttpParams()
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("branchId", (parameters.branchId ?? -1).toString())
            .set("warehouseId", (parameters.warehouseId ?? -1).toString())
            .set("type", (parameters.type ?? -1).toString())
            .set("reason", (parameters.reason ?? -1).toString())
            .set("supplierId", (parameters.supplierId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("saleDocumentId", (parameters.saleDocumentId ?? -1).toString())
            .set("buyDocumentId", (parameters.buyDocumentId ?? -1).toString());
        }
        
        return this._httpClient.get<ProductMovementDto[]>(`${this.getPartialUrl()}/product/movement/header`, { params: queryString});
    }

    public findProductMovementDetail(parameters?: { productMovementId:number }) : Observable<ProductMovementDetailDto[]> {
        let queryString : HttpParams = new HttpParams()
            .set("productMovementId", parameters.productMovementId.toString());
            return this._httpClient.get<ProductMovementDetailDto[]>(`${this.getPartialUrl()}/product/movement/detail`, { params: queryString});
    }

    public createProductMovement(productMovementDto:ProductMovementDto) : Observable<boolean> {
        return this._httpClient.post<boolean>(`${this.getPartialUrl()}/product/movement`, productMovementDto);
    }

    public editProductMovement(productMovementDto:ProductMovementDto) : Observable<boolean> {
        return this._httpClient.put<boolean>(`${this.getPartialUrl()}/product/movement`, productMovementDto);
    }

    public rollbackProductMovement(productMovementId:number) : Observable<boolean> {
        return this._httpClient.delete<boolean>(`${this.getPartialUrl()}/product/movement/${ productMovementId }`);
    }
}