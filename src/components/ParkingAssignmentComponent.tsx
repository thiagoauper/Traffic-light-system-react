import "./ParkingAssignmentComponent.scss";
import ParkingAssignment from "../models/ParkingAssignment";

interface IParkingAssignmentComponent {
    assignment: ParkingAssignment;
}

const ParkingAssignmentComponent: React.FC<IParkingAssignmentComponent> = ({assignment} : IParkingAssignmentComponent) => {
  return (
    <div className="container">
        <div>{assignment.licencePlate}</div>
        <div>{assignment.employee}</div>
        <div>{assignment.fuelAdded}</div>
        <div>{assignment.price}</div>
    </div>
  );
}

export default ParkingAssignmentComponent;