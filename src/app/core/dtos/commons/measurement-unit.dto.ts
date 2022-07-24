import { MasterDto } from "../master.dto";

export class MeasurementUnitDto extends MasterDto {
    public symbol: string;
    public isoCode: string;
    public allowDecimals: boolean;
}