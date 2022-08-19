import { DtoBase } from "../base.dto";

export class PersonContactDto extends DtoBase
{
    public personId : number;
    public name : string;
    public position : string;
    public phoneNumber : string;
    public mobileNumber : string;
    public email : string;
    public isBillingMail : boolean;
}