export class Owner {
    identity_card: string;
    names : string;
    surnames: string;
    phone: string;
    email: string;

    fill(data){  
        if(data){
            this.identity_card = data.identity_card ? data.identity_card : this.identity_card;
            this.names = data.names;
            this.surnames = data.surnames;
            this.phone = data.phone;
            this.email = data.email;
        }
    }
}