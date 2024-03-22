import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import User from '../user/user.entity';
import Courses from '../course/course.entity';

@Table({
  tableName: 'course_progress',
  timestamps: true,
})
export default class ProgressCourse extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER) 
  public id: number;
    
  @BelongsTo(() => User, { foreignKey: 'user_id' })
  public user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public user_id: number;
  
  @BelongsTo(() => Courses, { foreignKey: 'course_id' })
  public course: Courses;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public course_id: number;

  @Column({
    type: DataType.ENUM,
    values: ['PENDIENTE', 'PROGRESO', 'FINALIZADO'],
    allowNull: false,
    defaultValue: 'PENDIENTE',
  })
  public status: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  public date_approved: Date;

}