import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../user/user.zod";

export class AuthController {

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
}


