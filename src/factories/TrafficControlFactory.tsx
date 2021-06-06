import TrafficControlService from "../services/TrafficControlService";

export default class TrafficControlFactory
{
    private trafficControlService?: TrafficControlService;

    getTrafficControlService() : TrafficControlService {
        if(!this.trafficControlService) {
            this.trafficControlService = new TrafficControlService();
        }

        return this.trafficControlService;
    }
}