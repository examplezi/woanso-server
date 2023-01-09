import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ComicRating } from 'src/apis/comicsRating/entities/comicRating.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum COMIC_CATEGORY_ENUM {
  romance = '로맨스',
  drama = '드라마/일상',
  fantasy = '판타지',
  action = '액션',
  school = '학원',
  horror = '추리/공포',
}

registerEnumType(COMIC_CATEGORY_ENUM, {
  name: 'COMIC_CATEGORY_ENUM',
});

@Entity()
@ObjectType()
export class Comic {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  comicId: string;

  @Column({ nullable: true })
  @Field(() => String)
  title: string;

  @Column({ nullable: true, default: 0 })
  @Field(() => Int)
  deliveryFee: number;

  @Column({ nullable: true, default: 0 })
  @Field(() => Int)
  rentalFee: number;

  @Column({ nullable: true })
  @Field(() => String)
  author: string;

  @Column({ nullable: true })
  @Field(() => String)
  illustrator: string;

  @Column({ nullable: true })
  @Field(() => String)
  publisher: string;

  // @Column({ default: 0, nullable: true })
  // @Field(() => Float) // 별점을 줄 수 있도록 0.5 단위로 제한
  // rating: number;

  // @Column()
  // @Field(() => String) // 시리즈이기 떄문에 각각 발행일이 다르기 때문에
  // publicationDate: string;

  @Column()
  @Field(() => Int)
  totalBooks: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  ISBN: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isAvailable: boolean;

  @Column({ default: 0 })
  @Field(() => Int)
  wishListCount: number;

  @Column()
  //@Field(() => Int)
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn()
  @OneToOne(() => ComicRating)
  @Field(() => ComicRating)
  comicRating: ComicRating;

  @Field(() => COMIC_CATEGORY_ENUM)
  @Column({ type: 'enum', enum: COMIC_CATEGORY_ENUM, nullable: true })
  category: string;

  // @ManyToOne(() => Category)
  // @Field(() => Category)
  // category: Category;

  ///////

  // @OneToMany(() => Image, (image) => image.comic)
  // @Field(() => [Image]) //graphql 방식
  // image: Image[];

  //   @ManyToOne(() => Origin)
  //   @Field(() => Origin)
  //   origin: Origin;

  //   @ManyToOne(() => Seller)
  //   @Field(() => Seller)
  //   seller: Seller;

  //   @ManyToOne(() => ProductSub)
  //   @Field(() => ProductSub)
  //   productsub: ProductSub;

  //   @JoinColumn() //FK키로 가져와서 참조할 때, 한쪽 테이블에만 적어주기 / 1대 1
  //   @OneToOne(() => Order)
  //   @Field(() => Order)
  //   order: Order;

  //   @JoinTable()
  //   @ManyToMany(() => Color, (colors) => colors.products)
  //   @Field(() => [Color])
  //   colors: Color[];
}
