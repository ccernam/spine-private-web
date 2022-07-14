import { MasterDto } from "../master.dto";

export class StockDto extends MasterDto {

    public productId: number;
    public warehouseId: number;
    public availableQuantity: number;
    public realQuantity: number;

    public warehouseName: string;
    public branchId: number;
    public branchName: string;

}