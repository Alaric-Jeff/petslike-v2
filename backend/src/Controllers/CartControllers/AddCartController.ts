import { FastifyRequest, FastifyReply } from "fastify";
import { userIdType } from "../../Schemas/userIdSchema.js";
import AddCartService from "../../Services/CartsService/AddCartService.js";


const AddCartController = async ({server, body}: FastifyRequest<{Body: userIdType}>, reply: FastifyReply) => {

    const {
        user_id
    } = body;

    try{
        await AddCartService(server, {user_id});
        return reply.code(200).send({
            message: "Product added to cart successfully",
            success: true
        });
    }catch(err: unknown){
        return reply.code(500).send({
            message: "Internal server error",
            success: false
        });
    }
};

export default AddCartController;
