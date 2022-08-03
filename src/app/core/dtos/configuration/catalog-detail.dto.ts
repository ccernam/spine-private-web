import { DtoBase } from "../base.dto";

export class CatalogDetailDto extends DtoBase {
    public catalogId: number;
    public name: string;
    public shortName: string;
    public numericValue: number;
    public textValue: string;
    public order: number;
}