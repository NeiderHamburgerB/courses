import { AccessControl } from "accesscontrol";

export enum RolesApp {
    ADMIN    = 'ADMIN',
    USUARIO  = 'USUARIO'
};

export enum ResourcesApp {
    COURSE = 'COURSE',
    USER   = 'USER',
    LESSON = 'LESSON'
};

const ac = new AccessControl();
export const roles = (function() {
    ac
        .grant(RolesApp.USUARIO)
            .readAny([ResourcesApp.COURSE])
            .readOwn([ResourcesApp.COURSE])
            
        .grant(RolesApp.ADMIN)  
            .createAny([ResourcesApp.COURSE])
            .readAny([ResourcesApp.COURSE])
            .readOwn([ResourcesApp.COURSE])
            .updateAny([ResourcesApp.COURSE])
            .deleteAny([ResourcesApp.COURSE])

    return ac
})();

