import "./LightComponent.css";

function LightComponent(props: any) {
  return (
    <div className={props.enabled ? props.color : "Gray"}>
        O
    </div>
  );
}

export default LightComponent;
