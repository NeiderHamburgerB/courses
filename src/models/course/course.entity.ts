import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
} from 'sequelize-typescript';
import Lesson from '../lesson/lesson.entity';
import ProgressCourse from '../course-progress/course-progress.entity';

@Table({
    tableName: 'courses',
    timestamps: true,
    paranoid: true,
})
export default class CoursesEntity extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER) 
    public id: number;

    @Column(DataType.STRING)
    public logo: string

    @Column(DataType.STRING)
    public title: string;

    @Column(DataType.STRING)
    public description: string;

    @Column(DataType.STRING)
    public introductory_video: string;

    @HasMany(() => Lesson)
    public lessons: Lesson[];

    @HasMany(() => ProgressCourse, { as: 'courseProgress' })
    public progressCourses: ProgressCourse[];

    @Column(DataType.BOOLEAN)
    is_active: boolean;

    @Column({ type: DataType.DATE, allowNull: true })
    deletedAt: Date;

}