import { DtoBase } from "./base.dto";

export class MasterDto extends DtoBase {
    public companyId: number;
    public name: string;
    public reportingStatus?: number;
    public reportingStatusName: string;
}