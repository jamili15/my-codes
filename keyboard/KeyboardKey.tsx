// KeyboardKey.tsx
import React from "react";
import { useKeyboardContext } from "../keyboard/KeyboardContext";

interface KeyboardKeyProps {
  value: string;
  onClick?: () => void;
  customStyles?: React.CSSProperties;
}

function KeyboardKey(props: KeyboardKeyProps) {
  const context = useKeyboardContext();

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    if (context.activeInput && context.activeInput.current) {
      const inputElement = context.activeInput.current;
      const currentValue = inputElement.value;
      const selectionStart = inputElement.selectionStart || 0;
      const selectionEnd = inputElement.selectionEnd || 0;

      if (props.onClick) {
        props.onClick();
      } else {
        const newValue =
          currentValue.substring(0, selectionStart) +
          props.value +
          currentValue.substring(selectionEnd);
        inputElement.value = newValue;
        const newCursorPosition = selectionStart + props.value.length;
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      }
      inputElement.focus();
    }
  }

  const renderKeyContent = () => {
    if (props.value === "Bks") {
      return (
        <img
          src="/images/backspace.png"
          alt="Backspace"
          style={{ width: "65%", height: "45%" }}
        />
      );
    } else {
      return props.value;
    }
  };

  return (
    <div
      tabIndex={-1}
      className="flex items-center justify-center w-full h-20 m-1 rounded-md border-gray-300 border-2 shadow-[5px_5px_10px_1px_rgba(0,0,0,0.2)]"
      onClick={clickHandler}
      style={props.customStyles}
    >
      {renderKeyContent()}
    </div>
  );
}

export default KeyboardKey;
