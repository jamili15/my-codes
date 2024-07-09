// KioskLayout.tsx
import React, { useContext } from "react";
import { useKeyboardContext } from "../keyboard/KeyboardContext";

interface KioskLayoutProps {
  children: React.ReactNode;
}

function KioskLayout(props: KioskLayoutProps) {
  const context = useKeyboardContext();

  function clickHandler() {
    if (context.activeInput && context.activeInput.current) {
      context.activeInput.current.value = "";
      context.setActiveInput(null);
    }
  }

  return <div onClick={clickHandler}>{props.children}</div>;
}

export default KioskLayout;
