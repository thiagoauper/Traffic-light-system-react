import "./TrafficLightComponent.css";
import LightComponent from "./LightComponent";

function TrafficLightComponent(props: any) {
  return (
    <div className="TrafficLight">
      <div>
        <LightComponent color="Red" enabled={props.color === "Red"} />
        <LightComponent color="Yellow" enabled={props.color === "Yellow"} />
        <LightComponent color="Green" enabled={props.color === "Green"} />
      </div>
    </div>
  );
}

export default TrafficLightComponent;
