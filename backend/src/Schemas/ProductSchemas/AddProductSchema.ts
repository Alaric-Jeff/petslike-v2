import { Type, Static } from '@sinclair/typebox';
import { FoodCategory, DietCategory, LifeStage, AnimalType } from '../Enums/ProductEnums.js';

const ProductSchema = Type.Object({
  productName: Type.String({minLength: 3, maxLength: 100}),
  productPrice: Type.Number({minimum: 0}),
  productStock: Type.Number({minimum: 0}),
  isDiscounted: Type.Boolean({default: false}),
  foodCategory: Type.Enum(FoodCategory),
  dietCategory: Type.Enum(DietCategory),
  lifeStage: Type.Enum(LifeStage),
  animalType: Type.Enum(AnimalType),
  productDescription: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  discountPercentage: Type.Optional(Type.Union([Type.Number({}), Type.Null()])),
});

type Product = Static<typeof ProductSchema>;

export default ProductSchema;
