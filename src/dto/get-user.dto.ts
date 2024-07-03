import { Role } from "src/entity/role.enum";

export class GetUserDto {
    id?: number;
    userName?: string;
    email?: string;
    age?: number;
    isAlive?: boolean;
    role?: Role
}