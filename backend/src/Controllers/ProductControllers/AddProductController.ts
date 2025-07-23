import {Product} from "../../Schemas/ProductSchemas/AddProductSchema.js";
import AddProduct from "../../Services/ProductService/AddProduct.js";
import { FastifyRequest, FastifyReply, FastifyInstance} from "fastify";

const AddProductController = async (request: FastifyRequest<{Body: Product}>, reply: FastifyReply) => {
         const {
            productDescription,
            discountPercentage,
            productName,
            productPrice,
            productStock,
            isDiscounted,
            foodCategory,
            dietCategory,
            lifeStage,
            animalType
        } = request.body;

        const fastify = request.server as FastifyInstance;

        if(!productName || !productPrice || !productStock || !isDiscounted || !foodCategory || !dietCategory || !lifeStage ||!animalType){
            reply.log.warn(`Incomplete required fields`);
            return reply.code(404).send({
                message: "Incomplete required fields",
                success: false
            });
        };

        if(isNaN(productPrice) || isNaN(productStock)){
            reply.log.warn(`Incomplete required fields`);
            return reply.code(404).send({
                message: "Invalid input in numeric fields",
                sucess: false
            });
        };

    try{
        const newProduct = await AddProduct(
            fastify,
            {productName,
            productPrice,
            productStock,
            isDiscounted,
            foodCategory,
            dietCategory,
            lifeStage,
            animalType,
            productDescription,
            discountPercentage}
        );

        if(!newProduct){
            reply.log.warn(`Product is not created in the services, recieved: ${newProduct}`);
            return reply.code(404).send({
                message: `Failed to create product`,
                success: false
            });
        };

        return reply.code(200).send({
            message: `Succesfully created product`,
            success: true
        });

    }catch(err: unknown){
        return reply.code(500).send({
            message: "Internal server error",
            success: false
        });
    };
};

export default AddProductController;



