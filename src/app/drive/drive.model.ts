export class Drive{
    id: string;
    title: string;
    manufacturer: string;
    capacity: string;
    buffer: string;
    conector: string;
    format: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, capacity:string, buffer:string, conector:string, format:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.capacity = capacity;
        this.buffer = buffer;
        this.conector = conector;
        this.format = format;
        this.price = price;
    }
}