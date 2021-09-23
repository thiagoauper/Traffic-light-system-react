import "./ParkingAssignmentComponent.scss";
import ParkingAssignment from "../models/ParkingAssignment";

interface IParkingAssignmentComponent {
    assignment: ParkingAssignment;
}

const ParkingAssignmentComponent: React.FC<IParkingAssignmentComponent> = ({assignment} : IParkingAssignmentComponent) => {
  return (
    <div>
        <div>{assignment.LicencePlate}</div>
        <div>{assignment.Employee}</div>
        <div>{assignment.FuelAdded}</div>
        <div>{assignment.Price}</div>
    </div>
  );
}

export default ParkingAssignmentComponent;