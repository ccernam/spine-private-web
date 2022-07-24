import { MasterDto } from "../master.dto";

export class CurrencyDto extends MasterDto {
    public symbol: string;
    public isoCode: string;
}