import Light from "./Light";

export default class Road
{
    Light: Light;

    constructor()
    {
        this.Light = new Light();
    }
}