import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
    
    @ApiPropertyOptional({
        example: 10,
        description: 'Limit of items per page',
        default: 10
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number) // enableImplicitConversions: true
    limit?: number;

    @ApiPropertyOptional({
        example: 0,
        description: 'Number of items to skip',
        default: 0
    })
    @IsOptional()
    @Min(0)
    @Type(() => Number) // enableImplicitConversions: true
    offset?: number;
}
