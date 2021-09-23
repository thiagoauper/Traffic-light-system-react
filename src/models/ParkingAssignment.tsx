export default class ParkingAssignment
{
    constructor(licensePlate: string, employee: string, fuelAdded: number, price: number) {
        this.LicencePlate = licensePlate;
        this.Employee = employee;
        this.FuelAdded = fuelAdded;
        this.Price = price;
    }

    LicencePlate: string = "";
    Employee: string = "";
    FuelAdded: number = 0;
    Price: number = 0;
}