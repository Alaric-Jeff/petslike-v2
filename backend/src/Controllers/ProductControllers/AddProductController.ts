import {Product} from "../../Schemas/ProductSchemas/AddProductSchema.js";
import AddProduct from "../../Services/ProductService/AddProduct.js";
import { FastifyRequest, FastifyReply} from "fastify";

const AddProductController = async ({body, server}: FastifyRequest<{Body: Product}>, reply: FastifyReply) => {
    const {
            product_description,
            discount_percentage,
            product_name,
            product_price,
            product_stock,
            is_discounted,
            food_category,
            diet_category,
            life_stage,
            animal_type
    } = body;

    const fastify = server;
    try{
        const newProduct = await AddProduct(
            fastify,
            {product_name,
            product_price,
            product_stock,
            is_discounted,
            food_category,
            diet_category,
            life_stage,
            animal_type,
            product_description,
            discount_percentage}
        );

        if(!newProduct){
            reply.log.warn(`Product is not created in the services, received: ${newProduct}`);
            return reply.code(404).send({
                message: `Failed to create product`,
                success: false
            });
        };

        return reply.code(200).send({
            message: `Succesfully created product`,
            success: true, 
            product: newProduct
        });

    }catch(err: unknown){
        fastify.log.info(`Error: ${err}`)
        return reply.code(500).send({
            message: "Internal server error",
            success: false
        });
    };
};

export default AddProductController;



