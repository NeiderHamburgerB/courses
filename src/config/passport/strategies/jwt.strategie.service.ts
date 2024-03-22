import passport from "passport";
import { Strategy , ExtractJwt } from "passport-jwt";

passport.use(new Strategy({
    secretOrKey: `${process.env.JWT_SECRET}`,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token:any, done:any) => {
    try {
        return done(null, token.user);
    } catch (e) {
        done(e);
    }
}));
