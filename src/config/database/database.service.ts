import { Sequelize } from "sequelize-typescript";
import { entities } from '../../models/index';

const db = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bizNationDev',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
};

export default new Sequelize({
  ...db,
  port: (process.env.DB_PORT as any) || 3307,
  dialect: "mysql",
  logging: false,
  ssl:false,
  models: [entities],
  define: {
    underscored: true,
    charset: "utf8",
    timestamps: false,
  },
});

