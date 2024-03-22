import * as jwt from "./strategies/jwt.strategie.service";
import * as local from "./strategies/local.strategie.service";

const strategies = [jwt,local];

export default strategies;