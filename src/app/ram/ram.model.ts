export class Ram{
    id: string;
    title: string;
    manufacturer: string;
    capacity: string;
    generation: string;
    kit: string;
    frequency: string;
    voltage: string;
    latency: string;
    radiator: string;
    overclock: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, capacity:string, generation:string, kit:string, frequency:string, voltage:string, latency:string, radiator:string, overclock:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.capacity = capacity;
        this.generation = generation;
        this.kit = kit;
        this.frequency = frequency;
        this.voltage = voltage;
        this.latency = latency;
        this.radiator = radiator;
        this.overclock = overclock;
        this.price = price;
    }
}