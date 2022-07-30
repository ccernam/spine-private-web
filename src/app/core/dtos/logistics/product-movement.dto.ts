import { DtoBase } from "../base.dto"

export class ProductMovementDto extends DtoBase {
    public parentId?: number;
    public companyId: number;
    public branchId: number;
    public warehouseId: number;
    public type: number;
    public issueDate: Date;
    public reason: number;
    public comments: string;
    public saleDocumentId?: number;
    public buyDocumentId?: number;
    public supplierId?: number;

    public companyName: string;
    public branchName: string;
    public warehouseName: string;
    public typeName: string;
    public reasonName: string;
    public saleDocumentNumber: string;
    public buyDocumentNumber: string;
    public supplierName: string;
}