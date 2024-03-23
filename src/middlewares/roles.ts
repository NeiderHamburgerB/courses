import { UserService } from "../modules/user/user.service";
import { roles } from "../config/roles/roles";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const grantAccess = function(action: any, resource: any) {

    return async (req: any, res: Response, next: any) => {

        let auth = req.headers['authorization'];

        if (!auth) {
            console.log('No auth token');
            return res.status(403).json({ message: "Not proportional token" }).end();
        }

        const token = auth.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.status(401).json({ message: 'Token inválido' });
            }
            req.user = decoded;
        });

        const id = req.user?.sub;

        let userService = new UserService();

        let user:any;

        try {
            user = await userService.findOne({ id });
        } catch (error) {
            console.log('Error fetching user:', error);
            next(error);
            return;
        }

        const permission = roles.can(user.roles)[action](resource);

        if (!permission.granted) {
            console.log('No Authorization');
            return res.status(401).json({
                err: "Unauthorized"
            }).end();
        }

        console.log('Permission granted');
        next();
    }
};