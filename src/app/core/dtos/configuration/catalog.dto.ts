import { DtoBase } from "../base.dto";
import { CatalogDetailDto } from "./catalog-detail.dto";

export class CatalogDto extends DtoBase {
    public code: string;
    public name: string;
    public description: string;
    public details? : CatalogDetailDto[]
}