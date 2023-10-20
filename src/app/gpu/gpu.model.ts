export class Gpu{
    id: string;
    title: string;
    manufacturer: string;
    slot: string;
    processor: string;
    cores: string;
    technologies: string;
    series : string;
    processorFrequency: string;
    memorySize: string;
    memoryType: string;
    memoryBusSize: string;
    directX: string;
    openGL: string;
    displayPorts: string;
    hdmiPorts: string;
    vgaPorts: string;
    dviPorts: string;
    powerPorts: string;
    power: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, slot:string, processor:string, cores:string, technologies:string, series:string, processorFrequency:string, memorySize:string, memoryType:string, memoryBusSize:string, directX:string, openGL:string, displayPorts:string, hdmiPorts:string, vgaPorts:string, dviPorts:string, powerPorts:string, power:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.slot = slot;
        this.processor = processor;
        this.cores = cores;
        this.technologies = technologies;
        this.series = series;
        this.processorFrequency = processorFrequency;
        this.memorySize = memorySize;
        this.memoryType = memoryType;
        this.memoryBusSize = memoryBusSize
        this.directX = directX;
        this.openGL = openGL;
        this.displayPorts = displayPorts;
        this.hdmiPorts = hdmiPorts;
        this.vgaPorts = vgaPorts;
        this.dviPorts = dviPorts;
        this.powerPorts = powerPorts;
        this.power = power;
        this.price = price;
    }

}