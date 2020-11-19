import { Role } from './role.enum';

export class Employee {
    identity_card: string;
    names: string;
    surnames: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    role: Role;
    token?: string;

    fill(data){
        if(data){
            this.identity_card = data.identity_card;
            this.names = data.names;
            this.surnames = data.surnames;
            this.phone = data.phone;
            this.email = data.email;
            this.username = data.username;
            this.role = data.role;
            this.password = data.password;
        }
        
    }

}
