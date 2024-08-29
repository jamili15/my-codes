type SpacerProps = {
  height?: number;
};

export const Spacer: React.FC<SpacerProps> = ({ height = 30 }) => {
  return <div style={{ height: height }} />;
};
