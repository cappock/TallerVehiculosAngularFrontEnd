export class RepairDetail {
    description : string;
    cost : number;
    spare_parts : [];
    id : number;
    employee_id? : string;
    vehicle_id? : string;
    created_at? : string;
    last_modified? : string;
    state : string;    

    fill(data){
        if(data){
            this.cost = data.cost;
            this.spare_parts = data.spare_parts;
            this.description = data.description;
            this.state = data.state;
        }
    }
}
