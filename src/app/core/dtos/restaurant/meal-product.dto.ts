import { DtoBase } from "../base.dto";

export class MealProductDto extends DtoBase {
    public mealId : number;
    public productId: number;
    public quantity: number;
    public productName: string;
}