import { DtoBase } from "../base.dto";

export class PriceDto extends DtoBase {
    public companyId: number;
    public productId: number;
    public currencyId: number;
    public branchId: number;
    public ammount: number;
}