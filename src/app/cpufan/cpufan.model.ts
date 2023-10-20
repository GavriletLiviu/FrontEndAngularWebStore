export class Cpufan{
    id: string;
    title: string;
    manufacturer: string;
    socket: string;
    fanSpeed: string;
    cfm: string;
    noise: string;
    weight: string;
    dimensions: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, socket:string, fanSpeed:string, cfm:string, noise:string, weight:string, dimensions:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.socket = socket;
        this.fanSpeed = fanSpeed;
        this.cfm = cfm;
        this.noise = noise;
        this.weight = weight;
        this.dimensions = dimensions;
        this.price = price;
    }
}