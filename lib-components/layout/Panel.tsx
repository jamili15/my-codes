type PanelProps = {
  className?: string;
  children: React.ReactNode;
};

export const Panel: React.FC<PanelProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <div className={`flex flex-col ${className}`} {...restProps}>
      {children}
    </div>
  );
};
