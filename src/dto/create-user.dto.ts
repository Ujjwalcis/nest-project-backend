import { IsNotEmpty, IsNumber, IsString, IsEmail, Min, Max, IsStrongPassword, IsBoolean, IsEnum, IsEmpty } from "class-validator";
import { Role } from "src/entity/role.enum";

export class CreateUserDto {
    id: number

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsStrongPassword()
    @IsNotEmpty()
    password: string

    @IsNumber()
    @Min(1)
    @Max(150)
    @IsNotEmpty()
    age: number;

    @IsBoolean()
    @IsNotEmpty()
    isAlive: boolean

    @IsEnum(Role)
    role: Role
}

// this is basically a whitelist of properties that we will accept when taking the dog parameter