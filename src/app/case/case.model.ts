export class Case{
    id: string;
    title: string;
    manufacturer: string;
    fans: string;
    type: string;
    frontInputs: string;
    dimensions: string;
    motherboardFormat: string;
    color: string;
    weight: string;
    includedFans: string;
    price: number;  
    constructor(id:string, title:string, manufacturer:string, fans:string, type:string, frontInputs:string, dimensions:string, motherboardFormat:string, color:string, weight:string, includedFans:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.fans = fans;
        this.type = type;
        this.frontInputs = frontInputs;
        this.dimensions = dimensions;
        this.motherboardFormat = motherboardFormat;
        this.color = color;
        this.weight = weight;
        this.includedFans = includedFans;
        this.price = price;
    }
}