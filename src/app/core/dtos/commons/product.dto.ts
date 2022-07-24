import { MasterDto } from "../master.dto";

export class ProductDto extends MasterDto {
   public categoryId: number;
   public measurementUnitId: number;
   public code: string;
   public description: string;

   public measurementUnitName: string;
   public categoryName: string;
} 