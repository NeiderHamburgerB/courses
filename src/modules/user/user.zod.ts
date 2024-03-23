import { z } from "zod";

interface IUserSearch{
    email?:string,
    id?:number
}

const UserSchema = z.object({
    email: z.string().email(),
    document: z.object({
        type: z.string(),
        value: z.string()
    }),
    name: z.string(),
    last_name: z.string(),
    password: z.string(),
    roles: z.enum(["ADMIN", "USUARIO"])
});

const UserSchemaUpdate = z.object({
    email: z.string().email().optional(),
    document: z.object({
        type: z.string().optional(),
        value: z.string().optional()
    }).optional(),
    name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().optional(),
    roles: z.enum(["ADMIN", "USUARIO"]).optional()
});

type UserSchemaCreateDTO = z.infer<typeof UserSchema>;

interface IUser {
    id?:number,
    document:{
        type:string,
        value:string
    }
    name:string
    last_name:string
    email:string
    password?:string,
    roles:string[]
}

export { IUserSearch, UserSchemaCreateDTO, UserSchema, IUser, UserSchemaUpdate }