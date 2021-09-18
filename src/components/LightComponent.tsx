import "./LightComponent.scss";

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
