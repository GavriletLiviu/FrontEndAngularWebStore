export class Cpufanliquid{
    id: string;
    title: string;
    manufacturer: string;
    size: string;
    socket: string;
    fanSpeed: string;
    pumpSpeed: string;
    noise: string;
    weight: string;
    dimensions: string;
    fanLed: string;
    waterblockLed: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, size:string, socket:string, fanSpeed:string, pumpSpeed:string, noise:string, weight:string, dimensions:string, fanLed:string, waterblockLed:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.size = size;
        this.socket = socket;
        this.fanSpeed = fanSpeed;
        this.pumpSpeed = pumpSpeed;
        this.noise = noise;
        this.weight = weight;
        this.dimensions = dimensions;
        this.fanLed = fanLed;
        this.waterblockLed = waterblockLed;
        this.price = price;
    }

}