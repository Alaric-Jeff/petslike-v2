import DeleteProduct from "../../Services/ProductService/DeleteProduct.js";
import { DeleteProductType } from "../../Schemas/ProductSchemas/DeleteProductSchema.js";
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

const DeleteProductController = async ({body, server}: FastifyRequest<{Body: DeleteProductType}>, reply: FastifyReply) => {

    const {product_id} = body;
    const fastify = server as FastifyInstance;

    try{
        const deletedProduct = await DeleteProduct(fastify, product_id);

        if(!deletedProduct){
            fastify.log.error(`Product not found`);
            return reply.code(404).send({
                message: "Product not found", 
                success: false
            });
        };

        return reply.code(200).send({
            message: "Successfully deleted product", 
            success: true,
            data: deletedProduct
        });

    }catch(err: unknown){
        if(err instanceof Error){
            fastify.log.error(`DeleteProductController() failed, reason: ${err.message}`)
        }else{
            fastify.log.error(`Unknown Error Occured`)
        }
        return reply.code(500).send({
            message: "Internal server error",
            sucess: false
        })
    }
}


export default DeleteProductController;
