import { DtoBase } from "./base.dto";

export class MasterDto extends DtoBase {
    public name: string;
    public order?: number;
    public reportingStatus?: number;
    public reportingStatusName: string;
}