import { CourseService } from "./course.service";
import { Request, Response } from "express";
import to from "await-to-js";
import { PageOptionsDto } from "../../common/pagination";

export class CourseController {

  public courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async create(req: Request, res: Response, next: any) {

    const [error, user] = await to(this.courseService.create(req.body));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(201).send({ user });
  }

  async joinCourse(req: Request, res: Response, next: any) {

    const [error, course] = await to(this.courseService.joinCourse(req.body));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(201).send({ course });
  }

  async getAllCoursesByUser(req: Request, res: Response, next: any) {

    const { name, startDate, endDate, userProgress } = req.query;

    const pageOptionsDto: PageOptionsDto = new PageOptionsDto();

    const user_id = req.user['sub'];

    const role = req.user['roles'];

    const [error, courses] = await to(this.courseService.getAllCoursesByUser(
      user_id,
      pageOptionsDto,
      name,
      startDate,
      endDate,
      userProgress,
      role
    ));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(courses);
  }

  async getCourseById(req: Request, res: Response, next: any) {

    const id = req.params.id;

    const [error, course] = await to(this.courseService.getCourseById(+id));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(course);
  }

  async update(req: Request, res: Response, next: any) {

    const id = req.params.id;

    const [error, user] = await to(this.courseService.updateCourse(+id, req.body));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(user);
  }

  async deleteLesson(req: Request, res: Response, next: any) {

    const course_id = req.params.course_id;
    const lesson_id = req.params.lesson_id;

    const [error, user] = await to(this.courseService.deleteLessonIfNoProgress(+lesson_id, +course_id));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(user);
  }

  async deleteCourse(req: Request, res: Response, next: any) {

    const id = req.params.course_id;

    const [error, user] = await to(this.courseService.deleteCourse(+id));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send(user);
  }


}


