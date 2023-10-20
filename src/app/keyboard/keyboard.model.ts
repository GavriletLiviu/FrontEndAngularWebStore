export class Keyboard{
    id: string;
    title:string;
    manufacturer: string;
    connect: string;
    lights: string;
    weight: string;
    type: string;
    dimensions: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, connect:string, lights:string, weight:string, type:string, dimensions:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.connect = connect;
        this.lights = lights;
        this.weight = weight;
        this.type = type;
        this.dimensions = dimensions;
        this.price = price;
    }
}