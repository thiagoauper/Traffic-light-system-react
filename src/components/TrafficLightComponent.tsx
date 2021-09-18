import "./TrafficLightComponent.css";
import LightComponent from "./LightComponent";

interface ITrafficLightComponent {
  color: string
}

const TrafficLightComponent : React.FC<ITrafficLightComponent> = ({color}: ITrafficLightComponent) => {
  return (
    <div className="TrafficLight">
      <div>
        <LightComponent color="Red" enabled={color === "Red"} />
        <LightComponent color="Yellow" enabled={color === "Yellow"} />
        <LightComponent color="Green" enabled={color === "Green"} />
      </div>
    </div>
  );
}

export default TrafficLightComponent;
