import { useEffect, useState } from "react";
import ParkingService from "../services/ParkingService";
import "./ParkingAssignmentsComponent.scss";

const ParkingAssignmentsComponent: React.FC = () => {

  const [authenticationToken, setAuthenticationToken] = useState<string | undefined>();

  useEffect(() => {
    let parkingService: ParkingService = new ParkingService();

    let authToken = parkingService.Authenticate("allow user to enter user name", "allow user to enter password");

    setAuthenticationToken(authToken);
  }, []);

  return (
    <>
      <div>The Parking Assignments will be here!</div>
      <div>{authenticationToken ?? "Authentication token has not been retrieved yet."} </div>
    </>
  );
}

export default ParkingAssignmentsComponent;
