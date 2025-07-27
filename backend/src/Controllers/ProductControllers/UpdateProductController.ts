import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateProduct } from "../../Schemas/ProductSchemas/UpdateBodySchema.js";
import UpdateProductService from "../../Services/ProductService/UpdateProduct.js";

const UpdateProductController = async ({body, server}: FastifyRequest<{Body: UpdateProduct}>, reply: FastifyReply ) => {
    const data = body;
    try{
        const updatedProduct = await UpdateProductService(server, data)

        reply.code(200).send({
            message: "Successfully updated product",
            success: true,
            product: updatedProduct
        })

    }catch(err: unknown){
        if(err instanceof Error){
            reply.log.error(`Error in UpdateProductController, reason: ${err.message}`)
        }else{
            reply.log.error(`Unknown error`)
        }
        return reply.code(500).send({
            message: "Internal server error",
            success: false
        })
    }
}

export default UpdateProductController;
