import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Course from '../course/course.entity';

@Table({
  tableName: 'lessons',
  timestamps: true,
  paranoid: true,
})
export default class Lesson extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER) 
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public video: string;

  @BelongsTo(() => Course, { foreignKey: 'course_id' })
  public course: Course;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'NO ACTION' })
  public course_id: number;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

}