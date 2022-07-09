import { MasterDto } from "../master.dto";

export class WarehouseDto extends MasterDto {
    public branchId: number;
    public branchName: string;
}