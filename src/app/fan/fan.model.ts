export class Fan{
    id: string;
    title: string;
    manufacturer: string;
    size: string;
    dimensions: string;
    cfm: string;
    mtbf: string;
    noise: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, size:string, dimensions:string, cfm:string, mtbf:string, noise:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.size = size;
        this.dimensions = dimensions;
        this.cfm = cfm;
        this.mtbf = mtbf
        this.noise = noise;
        this.price = price;
    }
}