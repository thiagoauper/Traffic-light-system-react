import "./LightComponent.css";

function LightComponent(props: any) {
  return (
    <div className={props.color}>{props.label}</div>
  );
}

export default LightComponent;
