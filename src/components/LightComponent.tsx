import "./LightComponent.css";

interface ILightComponentProps {
  enabled: boolean,
  color: string
}

const LightComponent: React.FC<ILightComponentProps> = ({enabled, color} : ILightComponentProps) => {
  return (
    <div className={enabled ? color : color + " Disabled"}></div>
  );
}

export default LightComponent;
