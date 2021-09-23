import { useEffect, useState } from "react";
import ParkingAssignment from "../models/ParkingAssignment";
import ParkingService from "../services/ParkingService";
import ParkingAssignmentComponent from "./ParkingAssignmentComponent";
import "./ParkingAssignmentListComponent.scss";

const ParkingAssignmentListComponent: React.FC = () => {

  const [authenticationToken, setAuthenticationToken] = useState<string>("Authentication token has not been retrieved yet.");
  const [parkingAssignments, setParkingAssignments] = useState<ParkingAssignment[]>([]);

  useEffect(() => {
    let parkingService: ParkingService = new ParkingService();

    parkingService
      .Authenticate("allow user to enter user name", "allow user to enter password") //TODO: allow user to enter username and password
      .then(authToken => {
        setAuthenticationToken(authToken);

        parkingService.GetAssignments(authToken)
          .then(assignments => setParkingAssignments(assignments))
          .catch(error => console.log("Error obtaining parking assignments => " + error));

      })
      .catch(error => setAuthenticationToken("Error obtaining authentication token => " + error));
  }, []);

  return (
    <>
      <div>The Parking Assignments will be here!</div>
      <div>{authenticationToken}</div>
      <div>
        {parkingAssignments.map((assignment, index) => <ParkingAssignmentComponent assignment={assignment} key={index} /> )}
      </div>
    </>
  );
}

export default ParkingAssignmentListComponent;
