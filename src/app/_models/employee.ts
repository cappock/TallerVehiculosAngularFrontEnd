import { Role } from './role.enum';

export class Employee {
    identity_card: number;
    names: string;
    surnames: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    role: Role;
    token?: string;
}
