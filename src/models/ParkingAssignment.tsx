export default class ParkingAssignment
{
    constructor(licensePlate: string, employee: string, fuelAdded: number, price: number) {
        this.licencePlate = licensePlate;
        this.employee = employee;
        this.fuelAdded = fuelAdded;
        this.price = price;
    }

    licencePlate: string = "";
    employee: string = "";
    fuelAdded: number = 0;
    price: number = 0;
}