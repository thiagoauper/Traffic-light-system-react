import Intersection from "../models/Intersection";
import { LightStatus } from "../models/LigthStatus";
import PubSub from 'pubsub-js';
import Light from "../models/Light";


export default class TrafficControlService {
    // PRIVATE METHODS 
    private getIntersection(): Intersection {
        let intersection = JSON.stringify(new Intersection());
        if(!window.sessionStorage.getItem("Intersection"))
        {
            this.setIntersection(JSON.parse(intersection));
        }
        
        //had to do this trick because JSON.parse(...) does not accept string | null as parameter
        return JSON.parse(window.sessionStorage.getItem("Intersection") ?? intersection);
    }

    private setIntersection(intersection: Intersection) {
        window.sessionStorage.setItem("Intersection", JSON.stringify(intersection));
    }
    
    private setLight(light: Light, status: LightStatus, intersection: Intersection, topic: string){
        light.Status = status;
        this.setIntersection(intersection);
        PubSub.publish(topic, status);
    }

    private getLightsInterval() : number {
        const interval =
            this.getIsPeakHour()
            ? 
                this.getIntersection().NorthSouth.Light.Status === LightStatus.Green.toString()
                ? 40000 - this.getYellowThreshold()
                : 10000 - this.getYellowThreshold()
            : 20000 - this.getYellowThreshold();

        return interval;
    }

    private getYellowThreshold() : number {
        return 5000;
    }

    private getGreenThreshold() : number {
        return 4000;
    }


    // PUBLIC METHODS 
    updateLights() {
        let intersection = this.getIntersection();

        console.log("updateLights!");
        console.log("IsPeakHour? ==> " + this.getIsPeakHour());
        console.log("Lights interval ==> " + this.getLightsInterval());
        console.log("intersection.NorthSouth.Light.Status ==>" + intersection.NorthSouth.Light.Status);
        console.log("intersection.EastWest.Light.Status ==>" + intersection.EastWest.Light.Status);

        if(intersection.NorthSouth.Light.Status === LightStatus.Green.toString())
        {
            this.setLight(intersection.NorthSouth.Light, LightStatus.Yellow, intersection, "UPDATE_NorthSouthLights");
            setTimeout(() => {
                this.setLight(intersection.NorthSouth.Light, LightStatus.Red, intersection,  "UPDATE_NorthSouthLights");
                setTimeout(() => {
                    this.setLight(intersection.EastWest.Light, LightStatus.Green, intersection,  "UPDATE_EastWestLights");
                    setTimeout(() => PubSub.publish("updateLights", this.getLightsInterval()), this.getLightsInterval());
                }, this.getGreenThreshold());
            }, this.getYellowThreshold());
        }
        else if (intersection.NorthSouth.Light.Status === LightStatus.Red.toString())
        {
            this.setLight(intersection.EastWest.Light, LightStatus.Yellow, intersection,  "UPDATE_EastWestLights");
            setTimeout(() => {
                this.setLight(intersection.EastWest.Light, LightStatus.Red, intersection,  "UPDATE_EastWestLights");
                setTimeout(() => {
                    this.setLight(intersection.NorthSouth.Light, LightStatus.Green, intersection,  "UPDATE_NorthSouthLights");
                    setTimeout(() => PubSub.publish("updateLights", this.getLightsInterval()), this.getLightsInterval());
                }, this.getGreenThreshold());
            }, this.getYellowThreshold());
        }
            
        this.setIntersection(intersection);
    }

    getNorthSouthLightStatus(): string {
        return this.getIntersection().NorthSouth.Light.Status.toString();
    }

    getEastWestLightStatus(): string {
        return this.getIntersection().EastWest.Light.Status.toString();
    }

    setIsPeakHour(isPeakHour: boolean) {
        window.sessionStorage.setItem("isPeakHour", JSON.stringify(isPeakHour));
        console.log("setIsPeakHour ==>" + this.getIsPeakHour());
    }

    getIsPeakHour(): boolean {
        let isPeakHour = JSON.stringify(false);
        if(!window.sessionStorage.getItem("isPeakHour"))
        {
            this.setIsPeakHour(JSON.parse(isPeakHour));
        }
        //had to do this trick because JSON.parse(...) does not accept string | null as parameter
        return JSON.parse(window.sessionStorage.getItem("isPeakHour") ?? isPeakHour);
    }
}