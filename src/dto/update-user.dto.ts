import { Role } from "src/entity/role.enum";

export class UpdateUserDto {
    userName?: string;
    email?: string;
    age?: number;
    isAlive?: boolean;
    role?: Role
}