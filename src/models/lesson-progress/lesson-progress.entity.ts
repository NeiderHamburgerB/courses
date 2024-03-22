import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import User from '../user/user.entity';
import Lesson from '../lesson/lesson.entity';

@Table({
  tableName: 'lesson_progress',
  timestamps: true,
})
export default class ProgressLesson extends Model {

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
  user_id: number;

  @BelongsTo(() => Lesson, { foreignKey: 'lesson_id' })
  lesson: Lesson;

  @ForeignKey(() => Lesson)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lesson_id: number;

  @Column({
    type: DataType.ENUM,
    values: ['PENDIENTE', 'PROGRESO', 'FINALIZADO'],
    allowNull: false,
  })
  status: string;

}