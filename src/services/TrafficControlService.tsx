import Intersection from "../models/Intersection";
import { LightStatus } from "../models/LigthStatus";

export default class TrafficControlService {

    private getIntersection(): Intersection {
        let intersection = JSON.stringify(new Intersection());
        if(!window.sessionStorage.getItem("Intersection"))
        {
            this.setIntersection(JSON.parse(intersection));
        }
        
        //had to do this trick because JSON.parse(...) does not accept string | null as parameter
        // intersection = window.sessionStorage.getItem("Intersection") ?? intersection;
        return JSON.parse(window.sessionStorage.getItem("Intersection") ?? intersection);
    }

    private setIntersection(intersection: Intersection) {
        window.sessionStorage.setItem("Intersection", JSON.stringify(intersection));
    }

    updateLights() {
        console.log("updateLights!");
        console.log("IsPeakHour? ==> " + this.getIsPeakHour());
        console.log("Lights interval ==> " + this.getLightsInterval());

        let intersection = this.getIntersection();

        intersection.NorthSouth.Light.Status =
        intersection.NorthSouth.Light.Status === LightStatus.Green.toString()
            ? LightStatus.Red
            : LightStatus.Green;

        intersection.EastWest.Light.Status =
        intersection.NorthSouth.Light.Status === LightStatus.Green.toString()
            ? LightStatus.Red
            : LightStatus.Green;
            
        this.setIntersection(intersection);
    }

    getNorthSouthLightStatus(): string {
        return this.getIntersection().NorthSouth.Light.Status.toString();
    }

    getEastWestLightStatus(): string {
        return this.getIntersection().EastWest.Light.Status.toString();
    }

    getLightsInterval() : number {
        return this.getIsPeakHour()
            ? 10000
            : 5000;
    }

    setIsPeakHour(isPeakHour: boolean) {
        window.sessionStorage.setItem("isPeakHour", JSON.stringify(isPeakHour));
    }

    getIsPeakHour(): boolean {
        let isPeakHour = JSON.stringify(false);
        if(!window.sessionStorage.getItem("isPeakHour"))
        {
            this.setIsPeakHour(JSON.parse(isPeakHour));
        }
        return JSON.parse(window.sessionStorage.getItem("isPeakHour") ?? isPeakHour);
    }
}