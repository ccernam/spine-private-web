import { DtoBase } from "../base.dto";

export class BlogEntryDto extends DtoBase {
    public companyId: number;
    public title: string;
    public summary: string;
    public content: string;
    public image: string;
    public views: number;
    public likes: number;
    public userName: string;
}