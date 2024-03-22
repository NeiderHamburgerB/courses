import { IUserSearch, UserSchemaCreateDTO } from "./user.zod";
import { MailService } from "../../config/mail/mail.service";
import UserEntity from "../../models/user/user.entity";
import { genSaltSync, hashSync } from "bcryptjs";
import { CustomError } from "../../common/error";
import { PageDto, PageMetaDto, PageOptionsDto } from "../../common/pagination";

export class UserService {

    private mailService:MailService;

    constructor() {
        this.mailService = new MailService();
    }

    async create(payload:UserSchemaCreateDTO): Promise<UserEntity>{

        const user = await UserEntity.findOne({
            where: {
                email: payload.email
            }
        })

        if(user){
           throw new CustomError(`El usuario ya existe`, 400);
        }

        const hashedPassword = this.hash(payload.password);

        //*hash password
        payload.password = hashedPassword;

        //*send email
        await this.mailService.sendMessage([payload.email], 'Bienvenido', `Bienvenido a la plataforma`, `<h3>Bienvenido a la plataforma ${payload.name} ${payload.last_name}</h3><br><p>Gracias por registrarte :)</p>`);

        return await UserEntity.create(payload);

    }

    hash(password: string) {
        return hashSync(password, genSaltSync(8))
    }

    async findOne(data:IUserSearch){
        const user = await UserEntity.findOne({
            where: {...data},
            raw: true,
        })

        if(!user){
            throw new CustomError(`Usuario no encontrado`, 404);
        }

        return user;
    }

    async getAll(pageOptionsDto: PageOptionsDto) {

        const { skip, take } = pageOptionsDto;	

        const users = await UserEntity.findAndCountAll({
            raw: true,
            attributes: {
                exclude: ['password']
            },
            limit: take,
            offset: skip
        });

        const meta = new PageMetaDto({ pageOptionsDto, total: users.count });
      
        return new PageDto(users.rows, meta);

    }

    async getOne(id:number){

        const user = await UserEntity.findByPk(id,{
            raw: true,
            attributes: {
                exclude: ['password']
            }
        });

        if(!user){
            throw new CustomError(`Usuario no encontrado`, 404);
        }

        return user;    
    }

    async update(id:number, payload:UserSchemaCreateDTO){
        const user = await UserEntity.findByPk(id);

        if(!user){
            throw new CustomError(`Usuario no encontrado`, 404);
        }

        return await user.update(payload);
    }

    async delete(id:number){
        const user = await UserEntity.findByPk(id);

        if(!user){
            throw new CustomError(`Usuario no encontrado`, 404);
        }

        return await user.destroy();
    }


}