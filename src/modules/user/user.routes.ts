import { UserController } from "./user.controller";
import { Router } from "express";
import { UserSchemaUpdate } from "./user.zod";
import { validateData } from '../../middlewares/valid';
import { grantAccess } from "../../middlewares/roles";
import { ResourcesApp } from "../../config/roles/roles";

export class UserRoutes {

    public router: Router = Router();
    public controller = new UserController();
    

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/get-all',[grantAccess('readAny', ResourcesApp.USER)],this.controller.getAll.bind(this.controller));
        this.router.get('/get-one/:id',[grantAccess('readOwn', ResourcesApp.USER)],this.controller.getOne.bind(this.controller));
        this.router.put('/update/:id',[grantAccess('updateOwn', ResourcesApp.USER)],[validateData(UserSchemaUpdate)],this.controller.update.bind(this.controller));
        //this.router.delete('/delete/:id',this.controller.delete.bind(this.controller));
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;