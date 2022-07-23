import { PriceDto } from "./price.dto";

export class EditPricesDto {
    public productId: number;
    public currencyId: number;
    public priceDtos: PriceDto[];
}