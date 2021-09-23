import ParkingAssignment from "../models/ParkingAssignment";

export default class ParkingService {
    
    Authenticate(username: string, password: string): Promise<string> {
        var userCredentials = {"userName": "Thiago", "password": "any!"};

        return fetch("https://localhost:44306/api/Assignments/authenticate", 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify(userCredentials)
            })
            .then(response => response.json())
            .then(response => response as string);
    }

    GetAssignments(authenticationToken: string) : Promise<ParkingAssignment[]> {

        //TODO: Create a model to represent Vehicle
        var vehicles = [{
            "licencePlate": "A",
            "size": "large",
            "fuel": {
                "capacity": 57,
                "level": 0.07
            }
        }, {
            "licencePlate": "B",
            "size": "large",
            "fuel": {
                "capacity": 66,
                "level": 0.59
            }
        }];

        console.log("Retrieving parking assignments with the following authorization token => " + authenticationToken);

        return fetch("https://localhost:44306/api/Assignments", 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + authenticationToken
                  },
                  method: "POST",
                  body: JSON.stringify(vehicles)
            })
            .then(response => response.json())
            .then(response => response as ParkingAssignment[]);        
    }
}