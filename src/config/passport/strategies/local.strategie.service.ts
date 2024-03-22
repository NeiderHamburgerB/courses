import { UserService } from "../../../modules/user/user.service";
import { Strategy } from "passport-local";
import { compareSync } from "bcryptjs";
import passport from "passport";

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email:string, pass:string, done:any) => {
    try {
        const userService = new UserService();
        let user = await userService.findOne({ email });
        if (!user) return done(null, false, { message: 'El usuario no existe' });
        if (!compareSync(pass, user.password)) return done(null, false, { message: 'Usuario ó contraseña incorrecta' });
        let { password, ...rest } = user;
        return done(null, rest);
    } catch (e) {
        return done(e);
    }
}))
