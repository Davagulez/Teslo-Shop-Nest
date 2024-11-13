import { 
    IsIn, 
    IsInt, 
    IsArray, 
    IsNumber, 
    IsString, 
    MinLength, 
    IsPositive, 
    IsOptional,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({
        example: "david's shirt3",
        description: 'Product title',
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiPropertyOptional({
        example: 0,
        description: 'Product price',
        default: 0
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiPropertyOptional({
        example: null,
        description: 'Product description',
        nullable: true
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({
        example: 'davids_shirt3',
        description: 'Product slug - unique identifier in URL',
        uniqueItems: true
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiPropertyOptional({
        example: 0,
        description: 'Number of items in stock',
        default: 0
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        example: ["SM", "M", "L"],
        description: 'Available sizes'
    })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: 'men',
        description: 'Gender category',
        enum: ['men', 'women', 'kid', 'unisex']
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiPropertyOptional({
        example: ["blue", "gold", "boca"],
        description: 'Tags associated with the product'
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiPropertyOptional({
        example: ["http://1.jpg", "http://2.jpg"],
        description: 'Product images'
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
