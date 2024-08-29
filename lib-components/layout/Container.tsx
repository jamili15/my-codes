import CssBaseline from "@mui/material/CssBaseline";
import MuiContainer, {
  ContainerProps as MuiContainerProps,
} from "@mui/material/Container";

type ContainerProps = {} & MuiContainerProps;

export const Container: React.FC<ContainerProps> = ({
  children,
  ...restProps
}) => {
  return (
    <>
      <CssBaseline />
      <MuiContainer {...restProps}>{children}</MuiContainer>
    </>
  );
};
