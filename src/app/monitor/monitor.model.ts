export class Monitor{
    id: string;
    title: string;
    manufacturer: string;
    size: string;
    resolution: string;
    refresh: string;
    response: string;
    ports: string;
    format: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, size:string, resolution:string, refresh:string, response:string, ports:string, format:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.size = size;
        this.resolution = resolution;
        this.refresh = refresh;
        this.response = response;
        this.ports = ports;
        this.format = format;
        this.price = price;
    }
}