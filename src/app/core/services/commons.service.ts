import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { BranchDto } from "../dtos/commons/branch.dto";
import { CategoryDto } from "../dtos/commons/category.dto";
import { CurrencyDto } from "../dtos/commons/currency.dto";
import { EditPricesDto } from "../dtos/commons/edit-prices.dto";
import { MeasurementUnitDto } from "../dtos/commons/measurement-unit.dto";
import { PriceDto } from "../dtos/commons/price.dto";
import { ProductDto } from "../dtos/commons/product.dto";
import { StockDto } from "../dtos/commons/stock.dto";
import { WarehouseDto } from "../dtos/commons/warehouse.dto";
import { ServiceBase } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CommonsService extends ServiceBase {

    constructor(protected _httpClient: HttpClient) {
        super(environment.apiUrl, "commons", _httpClient)
    }

    // Currency
    public findCurrency(parameters?: { id?: number, companyId?: number, status?: number, reportingStatus?: number }): Observable<CurrencyDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<CurrencyDto[]>(`${this.getPartialUrl()}/currency`, { params: queryString });
    }
    public createCurrency(currencyDto: CurrencyDto): Observable<CurrencyDto> {
        return this._httpClient.post<CurrencyDto>(`${this.getPartialUrl()}/category`, currencyDto);
    }
    public editCurrency(currencyDto: CurrencyDto): Observable<CurrencyDto> {
        return this._httpClient.put<CurrencyDto>(`${this.getPartialUrl()}/category`, currencyDto);
    }


    // Category
    public findCategory(parameters?: { id?: number, companyId?: number, status?: number, reportingStatus?: number }): Observable<CategoryDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<CategoryDto[]>(`${this.getPartialUrl()}/category`, { params: queryString });
    }
    public createCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
        return this._httpClient.post<CategoryDto>(`${this.getPartialUrl()}/category`, categoryDto);
    }
    public editCategory(categoryDto: CategoryDto): Observable<CategoryDto> {
        return this._httpClient.put<CategoryDto>(`${this.getPartialUrl()}/category`, categoryDto);
    }


    // MeasurementUnit
    public findMeasurementUnit(parameters?: { id?: number, companyId?: number, status?: number, reportingStatus?: number }): Observable<MeasurementUnitDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<MeasurementUnitDto[]>(`${this.getPartialUrl()}/measurementUnit`, { params: queryString });
    }
    public createMeasurementUnit(measurementUnitDto: MeasurementUnitDto): Observable<MeasurementUnitDto> {
        return this._httpClient.post<MeasurementUnitDto>(`${this.getPartialUrl()}/measurementUnit`, measurementUnitDto);
    }
    public editMeasurementUnit(measurementUnitDto: MeasurementUnitDto): Observable<MeasurementUnitDto> {
        return this._httpClient.put<MeasurementUnitDto>(`${this.getPartialUrl()}/measurementUnit`, measurementUnitDto);
    }


    // Branch
    public findBranch(parameters?: { id?: number, companyId?: number, status?: number, reportingStatus?: number }): Observable<BranchDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<BranchDto[]>(`${this.getPartialUrl()}/branch`, { params: queryString });
    }
    public createBranch(branchDto: BranchDto): Observable<BranchDto> {
        return this._httpClient.post<BranchDto>(`${this.getPartialUrl()}/branch`, branchDto);
    }
    public editBranch(branchDto: BranchDto): Observable<BranchDto> {
        return this._httpClient.put<BranchDto>(`${this.getPartialUrl()}/branch`, branchDto);
    }


    // Warehouse
    public findWarehouse(parameters?: { id?: number, companyId?: number, branchId?: number, status?: number, reportingStatus?: number }): Observable<WarehouseDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("branchId", (parameters.branchId ?? -1).toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<WarehouseDto[]>(`${this.getPartialUrl()}/warehouse`, { params: queryString });
    }
    public createWarehouse(warehouseDto: WarehouseDto): Observable<WarehouseDto> {
        return this._httpClient.post<WarehouseDto>(`${this.getPartialUrl()}/warehouse`, warehouseDto);
    }
    public editWarehouse(warehouseDto: WarehouseDto): Observable<WarehouseDto> {
        return this._httpClient.put<WarehouseDto>(`${this.getPartialUrl()}/warehouse`, warehouseDto);
    }


    // Product
    public findProduct(parameters?: { id?: number, companyId?: number, code?: string, status?: number, reportingStatus?: number }): Observable<ProductDto[]> {
        if (parameters == null)
            parameters = {};
        let queryString: HttpParams = new HttpParams()
            .set("id", (parameters.id ?? -1).toString())
            .set("companyId", (parameters.companyId ?? -1).toString())
            .set("code", (parameters.code ?? "").toString())
            .set("status", (parameters.status ?? -1).toString())
            .set("reportingStatus", (parameters.reportingStatus ?? -1).toString());
        return this._httpClient.get<ProductDto[]>(`${this.getPartialUrl()}/product`, { params: queryString });
    }
    public getStocks(productId: number): Observable<StockDto[]> {
        return this._httpClient.get<StockDto[]>(`${this.getPartialUrl()}/product/getStocks/${productId}`, {});
    }
    public getPrices(productId: number, currencyId: number): Observable<PriceDto[]> {
        return this._httpClient.get<PriceDto[]>(`${this.getPartialUrl()}/product/getPrices/${productId}/${currencyId}`, {});
    }
    public editPrices(editPricesDto: EditPricesDto): Observable<boolean> {
        return this._httpClient.put<boolean>(`${this.getPartialUrl()}/product/editPrices`, editPricesDto);
    }
}