import React, {
  createContext,
  useContext,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface KeyboardContextProps {
  activeInput: React.RefObject<HTMLInputElement> | null;
  setActiveInput: Dispatch<
    SetStateAction<React.RefObject<HTMLInputElement> | null>
  >;
  keyboardType?: "alpha" | "numeric";
  setKeyboardType: React.Dispatch<React.SetStateAction<"alpha" | "numeric">>;
}

const keyboardContext = createContext<KeyboardContextProps | undefined>(
  undefined
);

function KeyboardContextProvider({ children }: { children: React.ReactNode }) {
  const [activeInput, setActiveInput] =
    useState<React.RefObject<HTMLInputElement> | null>(null);
  const [keyboardType, setKeyboardType] = useState<"alpha" | "numeric">(
    "alpha"
  );

  const value = {
    activeInput,
    setActiveInput,
    keyboardType,
    setKeyboardType,
  };

  return (
    <keyboardContext.Provider value={value}>
      {children}
    </keyboardContext.Provider>
  );
}

function useKeyboardContext() {
  const context = useContext(keyboardContext);
  if (!context) {
    throw new Error(
      "useKeyboardContext must be used within a KeyboardContextProvider"
    );
  }
  return context;
}

export { KeyboardContextProvider, useKeyboardContext };
