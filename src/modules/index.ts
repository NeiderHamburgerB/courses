import auth from "./auth/auth.routes";
import user from "./user/user.routes";
import course from "./course/course.routes";
import { Router } from "express";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/course", course);

export default routes;