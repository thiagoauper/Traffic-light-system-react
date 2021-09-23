import { useEffect, useState } from "react";
import ParkingAssignment from "../models/ParkingAssignment";
import ParkingService from "../services/ParkingService";
import ParkingAssignmentComponent from "./ParkingAssignmentComponent";
import "./ParkingAssignmentListComponent.scss";

const ParkingAssignmentListComponent: React.FC = () => {

  const [authenticationToken, setAuthenticationToken] = useState<string>("Authentication token has not been retrieved yet.");
  const [parkingAssignments, setParkingAssignments] = useState<ParkingAssignment[]>([]);

  async function fetchDataFromAPI() {
    let parkingService: ParkingService = new ParkingService();
    try {
      let authToken = await parkingService.Authenticate("allow user to enter user name", "allow user to enter password"); //TODO: allow user to enter username and password
      setAuthenticationToken(authToken);
      let assignments = await parkingService.GetAssignments(authToken);
      setParkingAssignments(assignments);
    } catch(exception) {
      console.error("Error when fetching data from API => " + exception);
    }
  }

  useEffect(() => {
    fetchDataFromAPI();
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
