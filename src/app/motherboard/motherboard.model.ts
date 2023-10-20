export class Motherboard{
    id: string;
    title: string;
    manufacturer: string;
    cpuSocket: string;
    chipset: string;
    supportedCpu: string;
    memoryType: string;
    memoryCapacity: string;
    memorySlots: string;
    pcieVersion: string;
    audioCodec: string;
    lan: string;
    connectivity: string;
    raidVersions: string;
    sataInterfaces: string;
    pciefullslots: string;
    pcieslots: string;
    m2slots: string;
    technologies: string;
    dimensions: string;
    price: number;
    constructor(id:string, title:string, manufacturer:string, cpuSocket:string, chipset:string, supportedCpu:string, memoryType:string, memoryCapacity:string, memorySlots:string, pcieVersion:string, audioCodec:string, lan:string, connectivity:string, raidVersions:string, sataInterfaces:string, pciefullslots:string, pcieslots:string, m2slots:string, technologies:string, dimensions:string, price:number){
        this.id = id;
        this.title = title;
        this.manufacturer = manufacturer;
        this.cpuSocket = cpuSocket;
        this.chipset = chipset;
        this.supportedCpu = supportedCpu;
        this.memoryType = memoryType;
        this.memoryCapacity = memoryCapacity;
        this.memorySlots = memorySlots;
        this.pcieVersion = pcieVersion;
        this.audioCodec = audioCodec;
        this.lan = lan;
        this.connectivity = connectivity;
        this.raidVersions = raidVersions;
        this.sataInterfaces = sataInterfaces;
        this.pciefullslots = pciefullslots;
        this.pcieslots = pcieslots;
        this.m2slots = m2slots;
        this.technologies = technologies;
        this.dimensions = dimensions;
        this.price = price;
    }
}