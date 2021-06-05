import Road from "./Road";

export default class Intersection
{
    NorthSouth: Road;
    EastWest: Road;

    constructor()
    {
        this.NorthSouth = new Road();
        this.EastWest = new Road();
    }
}