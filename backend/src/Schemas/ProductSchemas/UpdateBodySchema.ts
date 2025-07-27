import { Type, Static } from '@sinclair/typebox';
import { foodcategory, dietcategory, lifestage, animaltype } from '../Enums/ProductEnums.js';

const UpdateProductSchema = Type.Object({
  product_id: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
  product_name: Type.Optional(Type.String({ minLength: 3, maxLength: 100 })),
  product_price: Type.Optional(Type.Number({ minimum: 0 })),
  product_stock: Type.Optional(Type.Number({ minimum: 0 })),
  is_discounted: Type.Optional(Type.Boolean({ default: false })),

  food_category: Type.Optional(Type.Union([Type.Enum(foodcategory), Type.Null()])),
  diet_category: Type.Optional(Type.Union([Type.Enum(dietcategory), Type.Null()])),
  life_stage: Type.Optional(Type.Union([Type.Enum(lifestage), Type.Null()])),
  animal_type: Type.Optional(Type.Union([Type.Enum(animaltype), Type.Null()])),

  product_description: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  discount_percentage: Type.Optional(Type.Union([Type.Number(), Type.Null()])),
});

type UpdateProduct = Static<typeof UpdateProductSchema>;

export { UpdateProductSchema, UpdateProduct };
