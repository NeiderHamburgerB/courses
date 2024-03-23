import { AuthController } from "./auth.controller";
import { LoginSchema } from "./auth.zod";
import { Router } from "express";
import { validateData } from "../../middlewares/valid";
import { UserSchema } from "../user/user.zod";

export class AuthRoutes {

    public router: Router = Router();
    public controller = new AuthController();
    
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', [validateData(LoginSchema)],this.controller.login.bind(this.controller));
        this.router.post('/register',[validateData(UserSchema)], this.controller.create.bind(this.controller));
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;