import { DtoBase } from "../base.dto";

export class PersonAddressDto extends DtoBase
{
    public personId : number;
    public address : string;
    public addressReference : string;
    public isFiscalAddress : boolean;
}