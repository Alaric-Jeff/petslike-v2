import { Type, Static } from '@sinclair/typebox';
import { foodcategory, dietcategory, lifestage, animaltype } from '../Enums/ProductEnums.js';

const ProductSchema = Type.Object({
  product_name: Type.String({minLength: 3, maxLength: 100}),
  product_price: Type.Number({minimum: 0}),
  product_stock: Type.Number({minimum: 0}),
  is_discounted: Type.Boolean({default: false}),
  food_category: Type.Enum(foodcategory),
  diet_category: Type.Enum(dietcategory),
  life_stage: Type.Enum(lifestage),
  animal_type: Type.Enum(animaltype),
  product_description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  discount_percentage: Type.Optional(Type.Union([Type.Number({}), Type.Null()])),
});

type Product = Static<typeof ProductSchema>;

export {ProductSchema, Product};
