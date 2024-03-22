import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
})
export default class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER) 
    public id: number;

    @Column({
        type: DataType.JSON,
    })
    public document: {
        type: string;
        value: string;
    };

    @Column(DataType.STRING)
    public name: string;

    @Column(DataType.STRING)
    public last_name: string;

    @Unique
    @Column(DataType.STRING)
    public email: string;

    @Column(DataType.STRING)
    public password: string;

    @Column({
        type: DataType.ENUM,
        values: ["ADMIN", "ESTUDIANTE"],
        defaultValue: 'ESTUDIANTE',
    })
    public roles: string;

}