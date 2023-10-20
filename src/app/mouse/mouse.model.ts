export class Mouse{
    id: string;
    title: string;
    manufacturer: string;
    connection: string;
    sensor: string;
    resolution: string;
    buttons: string;
    weight: string;
    dimensions: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, connection:string, sensor:string, resolution:string, buttons:string, weight:string, dimensions:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.connection = connection;
        this.sensor = sensor;
        this.resolution = resolution;
        this.buttons = buttons;
        this.weight = weight;
        this.dimensions = dimensions;
        this.price = price;
    }
}