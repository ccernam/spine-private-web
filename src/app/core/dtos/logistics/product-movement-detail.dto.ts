import { DtoBase } from "../base.dto";

export class ProductMovementDetailDto extends DtoBase {
    public productMovementId: number;
    public productId: number;
    public quantity: number;
    public comments: string;
    public billedAmount: number;
    public productName: string;
}