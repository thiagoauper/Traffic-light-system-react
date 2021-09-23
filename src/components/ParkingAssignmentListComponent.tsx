import { useEffect, useState } from "react";
import ParkingAssignment from "../models/ParkingAssignment";
import ParkingService from "../services/ParkingService";
import ParkingAssignmentComponent from "./ParkingAssignmentComponent";
import "./ParkingAssignmentListComponent.scss";

const ParkingAssignmentListComponent: React.FC = () => {

  const [authenticationToken, setAuthenticationToken] = useState<string | undefined>();
  const [parkingAssignments, setParkingAssignments] = useState<ParkingAssignment[]>([]);

  useEffect(() => {
    let parkingService: ParkingService = new ParkingService();

    let authToken = parkingService.Authenticate("allow user to enter user name", "allow user to enter password");
    setAuthenticationToken(authToken);

    let assignments = parkingService.GetAssignments();
    setParkingAssignments(assignments);
  }, []);

  return (
    <>
      <div>The Parking Assignments will be here!</div>
      <div>{authenticationToken ?? "Authentication token has not been retrieved yet."} </div>
      <div>
        {parkingAssignments.map(assignment => <ParkingAssignmentComponent assignment={assignment} /> )}
      </div>
    </>
  );
}

export default ParkingAssignmentListComponent;
