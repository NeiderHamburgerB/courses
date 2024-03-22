import { CourseController } from "./course.controller";
import { Router } from "express";
import { CourseSchema, CourseProgressSchema } from "./course.zod";
import { validateData } from '../../middlewares/valid';
import { grantAccess } from "../../middlewares/roles";
import { ResourcesApp } from "../../config/roles/roles";

export class CourseRoutes {

    public router: Router = Router();
    public controller = new CourseController();
    
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/create',[grantAccess('createAny', ResourcesApp.COURSE),validateData(CourseSchema)],this.controller.create.bind(this.controller));
        this.router.post('/join-course',[validateData(CourseProgressSchema)],this.controller.joinCourse.bind(this.controller));
        this.router.get('/get-all-courses-by-user',[grantAccess('readOwn', ResourcesApp.COURSE)],this.controller.getAllCoursesByUser.bind(this.controller));
        this.router.get('/get-course-by-id/:id',[grantAccess('readOwn', ResourcesApp.COURSE)],this.controller.getCourseById.bind(this.controller));
        this.router.patch('/update-course-by-id/:id',[grantAccess('updateAny', ResourcesApp.COURSE)],this.controller.update.bind(this.controller));
        this.router.delete('/delete-lesson-by-id/:course_id/:lesson_id',[grantAccess('deleteAny', ResourcesApp.COURSE)],this.controller.deleteLesson.bind(this.controller));
        this.router.delete('/delete-course-by-id/:id',[grantAccess('deleteAny', ResourcesApp.COURSE)],this.controller.deleteCourse.bind(this.controller));
    }

}

const courseRoutes = new CourseRoutes();
export default courseRoutes.router;