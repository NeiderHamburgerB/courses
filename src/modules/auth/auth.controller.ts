import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../user/user.zod";
import { UserService } from "../user/user.service";
import to from "await-to-js";

export class AuthController {
  
  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response, next: any) {

    passport.authenticate('login', async (err, user: IUser) => {

      try {

        if (err || !user) return next(err);
        
        req.login(user, { session: false }, async (err) => {

          if (err) return next(err);

          let { id, roles } = user;

          let payload = { sub: id, roles };

          return res.json({
            user,
            accessToken: jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '24h' })
          });

        });
      }
      catch (e) {
        console.log('Error', e);
        return next(e);
      }

    })(req, res, next);

  }

  async create(req: Request, res: Response, next: any){

    const [error, user] = await to(this.userService.create(req.body));

    if (error) {
      return res.send({ error });
    }

    return res.status(201).send({ user });
  }


}


