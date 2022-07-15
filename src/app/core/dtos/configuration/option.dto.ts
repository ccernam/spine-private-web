import internal from "assert";
import { MasterDto } from "../master.dto";

export class OptionDto extends MasterDto {
    public description: string;
    public menuName: string;
    public menuIcon: string;
    public componentName: string;
    public componentResource: string;
    public actionName: string;
    public order: number;
    public type: number;
    public parentId: number;
    public applicationId: number;
    public children : OptionDto[];
}