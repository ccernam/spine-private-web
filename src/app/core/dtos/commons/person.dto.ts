import { MasterDto } from "../master.dto";
import { PersonAddressDto } from "./person-address.dto";
import { PersonContactDto } from "./person-contact.dto";

export class PersonDto extends MasterDto
{
    public type : number;
    public docType : number;
    public document : string;
    public paternalLastName : string;
    public maternalLastName : string;
    public firstName : string;
    public middleName : string;
    public businessName : string;
    public businessRepresentative : string;
    public comments : string;
    public isCustomer : boolean;
    public isProvider : boolean;
    public typeName : string;
    public docTypeName : string;
    public contacts : PersonContactDto[];
    public addresses : PersonAddressDto[];
}