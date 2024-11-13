import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
    
    @ApiProperty({
        example:'58fa710f-726c-49dd-ac99-3770944ffbbd',
        description:'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: "david's shirt3",
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique:true
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
        default: 0
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: null,
        description: 'Product description',
        nullable: true
    })
    @Column({
        type: 'text',
        nullable:true
    })
    description: string;

    @ApiProperty({
        example: 'davids_shirt3',
        description: 'Product slug - unique identifier in URL',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 0,
        description: 'Number of items in stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ["SM", "M", "L"],
        description: 'Available sizes'
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

     @ApiProperty({
        example: 'men',
        description: 'Gender category'
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ["blue", "gold", "boca"],
        description: 'Tags associated with the product'
    })
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];
    
    //images
    @ApiProperty({
        example: ["http://1.jpg", "http://2.jpg"],
        description: 'Product images'
    })
    @OneToMany(
        () => ProductImage,
        productImage => productImage.product,
        { cascade: true, eager: true}
    )
    images?: ProductImage[] ;

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        {eager: true}
    )
    user: User;

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugsInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'", '')
    }


}
