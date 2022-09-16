import { DtoBase } from "../base.dto";
import { MealProductDto } from "./meal-product.dto";

export class MealDto extends DtoBase {
    public companyId: number;
    public branchId: number;
    public name: string;
    public type: number;
    public branchName: string;
    public typeName: string;
    public products: MealProductDto[];
}