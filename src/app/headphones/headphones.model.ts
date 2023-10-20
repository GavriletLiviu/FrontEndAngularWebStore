export class Headphone{
    id: string;
    title: string;
    manufacturer: string;
    connectivity: string;
    impedance: string;
    microphone: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, connectivity:string, impedance:string, microphone:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.connectivity = connectivity;
        this.impedance = impedance;
        this.microphone = microphone;
        this.price = price;
    }    
}