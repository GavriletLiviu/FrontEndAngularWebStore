export class Cpu{
    public id: string;
    public manufacturer: string;
    public title: string;
    public family: string;
    public socket: string;
    public baseFrequency: string;
    public boostFrequency: string;
    public cores: string;
    public cacheL1: string;
    public cacheL3: string;
    public tdp: string;
    public price: number;

    constructor(id:string, manufacturer:string, title:string, family:string, socket:string, baseFrequency:string, boostFrequency:string, cores:string, cacheL1:string, cacheL3:string, tdp:string, price:number){
        this.id = id;
        this.manufacturer = manufacturer;
        this.title = title;
        this.family = family;
        this.socket = socket;
        this.baseFrequency = baseFrequency;
        this.boostFrequency = boostFrequency;
        this.cores = cores;
        this.cacheL1 = cacheL1;
        this.cacheL3 = cacheL3;
        this.tdp = tdp;
        this.price = price;
    }
}
