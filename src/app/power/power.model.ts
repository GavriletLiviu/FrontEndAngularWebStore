
export class Power{
    id: string;
    title: string;
    manufacturer: string;
    maxPower: string;
    connectorSata: string;
    connectorPeripherial: string;
    connectorMotherboard: string;
    connectorCpu: string;
    connectorPcie6: string;
    connectorPcie8: string;
    format: string;
    modularity: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, maxPower:string, connectorSata:string, connectorPeripherial:string, connectorMotherboard:string, connectorCpu:string, connectorPcie6:string, connectorPcie8:string, format:string, modularity:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.maxPower = maxPower;
        this.connectorSata = connectorSata;
        this.connectorPeripherial = connectorPeripherial;
        this.connectorMotherboard = connectorMotherboard;
        this.connectorCpu = connectorCpu;
        this.connectorPcie6 = connectorPcie6;
        this.connectorPcie8 = connectorPcie8;
        this.format = format;
        this.modularity = modularity;
        this.price = price;
    }
}