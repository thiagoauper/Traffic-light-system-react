import "./LightComponent.css";

function LightComponent(props: any) {
  return (
    <div className={props.enabled ? props.color : props.color + " Disabled"}></div>
  );
}

export default LightComponent;
