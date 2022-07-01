export class ApiResponseDto<TDto>{
    public type: number;
    public code: string;
    public message: string;
    public exceptionMessage: string;
    public data: TDto;
}