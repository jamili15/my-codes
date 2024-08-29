import MuiPaper, { PaperProps as MuiPaperProps } from "@mui/material/Paper";

type PaperProps = {} & MuiPaperProps;

export const Paper: React.FC<PaperProps> = ({
  elevation = 3,
  children,
  ...restProps
}) => {
  return (
    <MuiPaper className="p-4" elevation={elevation} {...restProps}>
      {children}
    </MuiPaper>
  );
};
