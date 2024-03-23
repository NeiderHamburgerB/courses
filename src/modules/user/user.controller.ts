import { UserService } from "./user.service";
import { Request, Response } from "express";
import to from "await-to-js";
import { PageOptionsDto } from "../../common/pagination";

export class UserController {

  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response, next: any){

    const pageOptionsDto: PageOptionsDto = new PageOptionsDto();

    const [error, users] = await to(this.userService.getAll(pageOptionsDto));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send({ users });

  }
  
  async getOne(req: Request, res: Response, next: any){
    
    const [error, user] = await to(this.userService.getOne(+req.params.id));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(200).send({ user });

  } 

  async update(req: Request, res: Response, next: any){
      
      const [error, user] = await to(this.userService.update(+req.params.id, req.body));
  
      if (error) {
        return res.status(400).send({ error });
      }
  
      return res.status(200).send({ user });
    
  }

  async delete(req: Request, res: Response, next: any){
      
      const [error, user] = await to(this.userService.delete(+req.params.id));
  
      if (error) {
        return res.status(400).send({ error });
      }
  
      return res.status(200).send({ user });
    
  }

}


