import { SetMetadata } from "@nestjs/common";
import { Role } from "../modules/role/enums/role.enums";

const ROLE_KEY = "role";
const Roles = (role: Role) => SetMetadata(ROLE_KEY, role);

export { ROLE_KEY, Roles };
