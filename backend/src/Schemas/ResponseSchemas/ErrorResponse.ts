import { Type } from "@sinclair/typebox";

const ErrorResponse = Type.Object({
  success: Type.Literal(false),
  message: Type.String()
});

export default ErrorResponse;