import CoursesEntity from "../../models/course/course.entity";
import UserEntity from "../../models/user/user.entity";
import orm from "../../config/database/database.service";
import { CourseProgressSchemaCreateDTO, CourseSchemaCreateDTO } from "./course.zod";
import Lesson from "../../models/lesson/lesson.entity";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../common/pagination";
import ProgressCourse from "../../models/course-progress/course-progress.entity";
import { Op } from "sequelize";
import ProgressLesson from "../../models/lesson-progress/lesson-progress.entity";
import { CustomError } from "../../common/error";

export class CourseService {

    constructor() {}

    async create(payload: CourseSchemaCreateDTO): Promise<CoursesEntity> {

        const { title, description, introductory_video, lessons } = payload;

        const t = await orm.transaction();

        try {

            const course = await CoursesEntity.create({
                title,
                description,
                introductory_video
            }, { transaction: t });

            for (const lessonData of lessons) {
                await Lesson.create({
                    ...lessonData,
                    course_id: course.id,
                }, { transaction: t });
            }

            await t.commit(); 
            return course;

        } catch (error) {
            await t.rollback();
            throw error; 
        }

    }

    async joinCourse(payload: CourseProgressSchemaCreateDTO): Promise<ProgressCourse> {

        const { user_id, course_id } = payload;
    
        const t = await orm.transaction();
    
        try {
            const user = await UserEntity.findByPk(user_id);
            const course = await CoursesEntity.findByPk(course_id, { transaction: t });
    
            if (!user || !course) {
                throw new CustomError('Usuario o curso no encontrado', 400);
            }

            if (user.roles === 'ADMIN') {
                throw new CustomError('No te puedes unir al curso porque eres un administrador', 400);
            }
    
            const existingProgress = await ProgressCourse.findOne({
                where: { course_id, status: 'PROGRESO'},
                transaction: t
            });

            if(!existingProgress) {

                const courseProgress = await ProgressCourse.create({
                    user_id,
                    course_id,
                    status: 'PENDIENTE' 
                }, { transaction: t });
        
                const lessons = await Lesson.findAll({
                    where: { course_id },
                    transaction: t
                });
        
                for (const lesson of lessons) {
                    await ProgressLesson.create({
                        user_id,
                        lesson_id: lesson.id,
                        status: 'PENDIENTE' 
                    }, { transaction: t });
                }

                await t.commit();
        
                return courseProgress;

            }else{
                if (existingProgress.status === 'PROGRESO') {
                    throw new CustomError('No te puedes unir al curso porque ya se encuentras iniciado.', 400);
                }
            }   
            
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async getAllCoursesByUser(id:number, pageOptionsDto: PageOptionsDto, title:any, startDate: any, endDate:any, userProgress:any, role:any): Promise<any> {
        
        try {

            const { skip, take } = pageOptionsDto;	

            const userId = id; 

            const whereCourse = {};

            if(role === 'USUARIO') {
                whereCourse['is_active'] = true;
            }

            const whereProgress = userId ? { user_id: userId } : {};
        
            if (title) {
              whereCourse['title'] = { [Op.like]: `%${title}%` };
            }
        
            if (startDate && endDate) {
              whereCourse['createdAt'] = { [Op.between]: [new Date(startDate), new Date(endDate)] };
            }
        
            if (userProgress && userId) {
              whereProgress['status'] = userProgress;
            }

            let include: any = [
                {
                    model: Lesson,
                    as: 'lessons',
                    attributes: ['id', 'title'],
                    paranoid: role !== 'ADMIN',
                }
            ];

            if (role === 'USUARIO') {
                include.push({
                    model: ProgressCourse,
                    as: 'courseProgress',
                    where: whereProgress,
                    required: !!userProgress,
                    attributes: ['status'],
                });
            }
        
            const courses = await CoursesEntity.findAndCountAll({
              where: whereCourse,
              include,
              limit:take,
              offset:skip,
              distinct: true,
              paranoid: role !== 'ADMIN',
            });
        
            const coursesData = await Promise.all(courses.rows.map(async (course) => {
              const totalLessons = await Lesson.count({
                where: { course_id: course.id }
              });
        
              let finishedLessons = 0;

              if (userId && role === 'USUARIO') {
                finishedLessons = await ProgressLesson.count({
                    include: [{
                      model: Lesson,
                      attributes: [],
                      where: { course_id: course.id }, 
                      required: true
                    }],
                    where: {
                      user_id: userId,
                      status: 'FINALIZADO'
                    }
                  });
              }

              if (role === 'ADMIN') {
                return {
                    ...course.toJSON(),
                    totalLessons,
                };
              }
        
              return {
                ...course.toJSON(),
                totalLessons,
                finishedLessons,
              };
            }));
        
            const meta = new PageMetaDto({ pageOptionsDto, total: courses.count });
      
            return new PageDto(coursesData, meta);

          } catch (error) {
            console.error(error);
            return error;
          }

    }

    async getCourseById(id: number): Promise<CoursesEntity> {

        const course = await CoursesEntity.findByPk(id, {
            include: [
                {
                    model: Lesson,
                    as: 'lessons',
                    attributes: ['id', 'title'],
                }
            ]
        });

        if (!course) {
            throw new CustomError(`Curso no encontrado`, 400);
        }

        return course;

    }

    async updateCourse(courseId: number, payload: CourseSchemaCreateDTO): Promise<CoursesEntity> {

        const { title, description, introductory_video, lessons } = payload;
    
        const t = await orm.transaction();
    
        try {

            const course = await CoursesEntity.findByPk(courseId, { transaction: t });

            if (!course) {
                throw new CustomError(`Curso no encontrado`, 400);
            }
    
            course.title = title;
            course.description = description;
            course.introductory_video = introductory_video;

            await course.save({ transaction: t });
    
            if (lessons && lessons.length > 0) {
                const existingLessonsIds = lessons.filter(lesson => lesson.id).map(lesson => lesson.id);
                if (existingLessonsIds.length > 0) {
                    const existingLessons = await Lesson.findAll({
                        where: {
                            id: existingLessonsIds,
                            course_id: courseId
                        },
                        transaction: t
                    });
    
                    for (const existingLesson of existingLessons) {
                        const updatedData = lessons.find(lesson => lesson.id === existingLesson.id);
                        if (updatedData) {
                            existingLesson.title = updatedData.title;
                            existingLesson.description = updatedData.description;
                            existingLesson.video = updatedData.video;
                            await existingLesson.save({ transaction: t });
                        }
                    }
                }
    
                const newLessons = lessons.filter(lesson => !lesson.id);
                for (const lessonData of newLessons) {
                    await Lesson.create({
                        ...lessonData,
                        course_id: courseId,
                    }, { transaction: t });
                }
            }
    
            await t.commit();
            return course;
    
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async deleteLessonIfNoProgress(lessonId: number, courseId: number): Promise<any> {
       
        const t = await orm.transaction();
      
        try {

          const lessonProgress = await ProgressLesson.findOne({
            where: { lesson_id: lessonId },
            transaction: t,
            raw: true,
          });
      
          if (lessonProgress.status === 'PROGRESO') {
            throw new CustomError(`No se puede eliminar la lección porque tiene progreso asociado.`, 400);
          }
    
          const courseProgress = await ProgressCourse.findOne({
            where: { course_id: courseId },
            transaction: t,
            raw: true,
          });
      
          if (courseProgress.status === 'PROGRESO') {
            throw new CustomError(`No se puede eliminar la lección porque el curso tiene un progreso asociado.`, 400);
          }
      
          await Lesson.destroy({
            where: { id: lessonId },
            transaction: t,
          });
      
          await t.commit();
          return { message: 'Lección eliminada correctamente.' };

        } catch (error) {
          await t.rollback();
          throw error;
        }
    }

    async deleteCourse(courseId: number): Promise<any> {
            
        const t = await orm.transaction();
    
        try {
    
            const courseProgress = await ProgressCourse.findOne({
                where: { course_id: courseId },
                transaction: t,
                raw: true,
            });
        
            if (courseProgress.status === 'PROGRESO') {
                
                throw new CustomError(`No se puede eliminar el curso porque tiene progreso asociado.`, 400);
               
            }
        
            await CoursesEntity.destroy({
                where: { id: courseId },
                transaction: t,
            });
        
            await t.commit();
            return { message: 'Curso eliminado correctamente.' };
    
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
    
}