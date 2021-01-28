export class Vehicle {
    plate: string;
    brand: string;
    model: string;
    color: string;
    vehicle_type: string;
    owners: Array<any>;

    fill(data){  
        if(data){
            this.plate = data.plate ?  data.plate.toLowerCase() : this.plate ;
            this.brand = data.brand;
            this.model = data.model;
            this.color = data.color;
            this.vehicle_type = data.vehicle_type ;
        }
    }
}