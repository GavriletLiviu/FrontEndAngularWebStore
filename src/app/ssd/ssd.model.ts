export class Ssd{
    id: string;
    title: string;
    manufacturer: string;
    capacity: string;
    connector: string;
    cache: string;
    memoryType: string;
    formFactor: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, capacity:string, connector:string, cache:string, memoryType:string, formFactor:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.capacity = capacity;
        this.connector = connector;
        this.cache = cache;
        this.memoryType = memoryType;
        this.formFactor = formFactor;
        this.price = price;
    }    
}