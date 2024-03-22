import { UserController } from "./user.controller";
import { Router } from "express";
import { UserSchema } from "./user.zod";
import { validateData } from '../../middlewares/valid';

export class UserRoutes {

    public router: Router = Router();
    public controller = new UserController();
    

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create',[validateData(UserSchema)],this.controller.create.bind(this.controller));
        this.router.get('/get-all',this.controller.getAll.bind(this.controller));
        this.router.get('/get-one/:id',this.controller.getOne.bind(this.controller));
        this.router.put('/update/:id',[validateData(UserSchema)],this.controller.update.bind(this.controller));
        this.router.delete('/delete/:id',this.controller.delete.bind(this.controller));
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;