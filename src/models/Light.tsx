import { LightStatus } from "./LigthStatus";

export default class Light
{
    Status: LightStatus;
    
    constructor() {
        this.Status = LightStatus.Red;
    }
}