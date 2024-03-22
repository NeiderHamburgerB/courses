import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

type LoginSchemaCreateDTO = z.infer<typeof LoginSchema>;

interface IAuth{
    email:string,
    password:string
};

export { LoginSchema, LoginSchemaCreateDTO, IAuth }