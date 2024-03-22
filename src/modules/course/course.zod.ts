import { z } from 'zod';
import { PageOptionsDto } from '../../common/pagination';

const LessonSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    video: z.string(),
});

const CourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    introductory_video: z.string(),
    lessons: z.array(LessonSchema).optional(),
});


const CourseProgressSchema = z.object({
    user_id: z.number(),
    course_id: z.number(),
});

class FilterCourseDto extends PageOptionsDto {
    title: string;
    startDate: string;
    endDate: string;
    userProgress: string;    
}

type CourseSchemaCreateDTO = z.infer<typeof CourseSchema>;
type CourseProgressSchemaCreateDTO = z.infer<typeof CourseProgressSchema>;

export { CourseSchema, CourseSchemaCreateDTO, CourseProgressSchema, CourseProgressSchemaCreateDTO, FilterCourseDto };
