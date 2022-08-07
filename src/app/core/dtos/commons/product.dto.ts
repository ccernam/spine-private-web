import { MasterDto } from "../master.dto";

export class ProductDto extends MasterDto {
   public categoryId: number;
   public measurementUnitId: number;
   public description: string;
   public stockControl: boolean;

   public measurementUnitName: string;
   public categoryName: string;
} 