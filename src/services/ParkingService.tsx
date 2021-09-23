import ParkingAssignment from "../models/ParkingAssignment";

export default class ParkingService {
    
    Authenticate(username: string, password: string): string {
        let token = "this will be the issued token";
        return token;
    }

    GetAssignments() : ParkingAssignment[] {
        let assignments: ParkingAssignment[] = 
        [
            new ParkingAssignment("A", "Employee 1", 25, 182.27), 
            new ParkingAssignment("B", "Employee 2", 17, 121.44), 
        ]
        return assignments;
    }
}