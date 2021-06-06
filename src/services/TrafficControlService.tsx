import Intersection from "../models/Intersection";
import { LightStatus } from "../models/LigthStatus";
import PubSub from 'pubsub-js';
import Light from "../models/Light";


export default class TrafficControlService {

    private getIntersection(): Intersection {
        var initialIntersection = new Intersection();
        initialIntersection.NorthSouth.Light.Status = LightStatus.Green;
        initialIntersection.EastWest.Light.Status = LightStatus.Red;

        let intersection = JSON.stringify(initialIntersection);
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

        debugger;

        let intersection = this.getIntersection();

        if(intersection.NorthSouth.Light.Status === LightStatus.Green.toString())
        {
            this.setLight(intersection.NorthSouth.Light, LightStatus.Yellow, intersection, "UPDATE_NorthSouthLights");
            setTimeout(() => {
                this.setLight(intersection.NorthSouth.Light, LightStatus.Red, intersection,  "UPDATE_NorthSouthLights");
                setTimeout(() => {
                    this.setLight(intersection.EastWest.Light, LightStatus.Green, intersection,  "UPDATE_EastWestLights");
                }, 4000);
            }, 5000);
        }
        else if (intersection.NorthSouth.Light.Status === LightStatus.Red.toString())
        {
            this.setLight(intersection.EastWest.Light, LightStatus.Yellow, intersection,  "UPDATE_EastWestLights");
            setTimeout(() => {
                this.setLight(intersection.EastWest.Light, LightStatus.Red, intersection,  "UPDATE_EastWestLights");
                setTimeout(() => {
                    this.setLight(intersection.NorthSouth.Light, LightStatus.Green, intersection,  "UPDATE_NorthSouthLights");
                }, 4000);
            }, 5000);
        }
            
        this.setIntersection(intersection);

        // PubSub.publish("UPDATE_NorthSouthLights", intersection.NorthSouth.Light.Status);
        // PubSub.publish("UPDATE_EastWestLights", intersection.EastWest.Light.Status);
    }
    
    setLight(light: Light, status: LightStatus, intersection: Intersection, topic: string){
        light.Status = status;
        this.setIntersection(intersection);
        PubSub.publish(topic, status);
    }

    getNorthSouthLightStatus(): string {
        return this.getIntersection().NorthSouth.Light.Status.toString();
    }

    getEastWestLightStatus(): string {
        return this.getIntersection().EastWest.Light.Status.toString();
    }

    getLightsInterval() : number {
        return this.getIsPeakHour()
            ? 40000
            : 20000;
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