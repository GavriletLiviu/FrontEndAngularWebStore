export class Speaker{
    id: string;
    title: string;
    manufacturer: string;
    type: string;
    topology: string;
    amplification: string;
    drivers: string;
    power: string;
    connectivity: string;
    weight: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, type:string, topology:string, amplification:string, drivers:string, power:string, connectivity:string, weight:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.type = type;
        this.topology = topology;
        this.amplification = amplification;
        this.drivers = drivers;
        this.power = power;
        this.connectivity = connectivity;
        this.weight = weight;
        this.price = price;
    }
}