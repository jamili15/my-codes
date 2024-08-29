import MuiFab, { FabProps as MuiFabProps } from "@mui/material/Fab";

type FabProps = {} & MuiFabProps;

export const Fab: React.FC<FabProps> = (props) => {
  return <MuiFab {...props}>{props.children}</MuiFab>;
};
