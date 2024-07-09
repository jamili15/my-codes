import KeyboardKey from "./KeyboardKey";
import { useKeyboardContext } from "../keyboard/KeyboardContext";
import {
  numSymRow1,
  numSymRow2,
  numSymRow3,
  numSymRow4,
  alphaRow1,
  alphaRow2,
  alphaRow3,
} from "./KeyboardData";

function Keyboard() {
  const context = useKeyboardContext();
  const alphaRow4 = [{ value: "SpaceBar" }];

  const alphaKeys = [alphaRow1, alphaRow2, alphaRow3, alphaRow4];
  const numKeys = [numSymRow1, numSymRow2, numSymRow3, numSymRow4];

  let keys = context.keyboardType === "alpha" ? alphaKeys : numKeys;

  const handleSpaceBar = () => {
    if (context.activeInput && context.activeInput.current) {
      const cursorPosition = context.activeInput.current.selectionStart ?? 0;
      context.activeInput.current.value =
        context.activeInput.current.value.substring(0, cursorPosition) +
        " " +
        context.activeInput.current.value.substring(cursorPosition);
      context.activeInput.current.setSelectionRange(
        cursorPosition + 1,
        cursorPosition + 1
      );
    }
  };

  const handleClear = () => {
    if (context.activeInput && context.activeInput.current) {
      context.activeInput.current.value = "";
    }
  };

  const handleBackspace = () => {
    if (context.activeInput && context.activeInput.current) {
      const cursorPosition = context.activeInput.current.selectionStart ?? 0;
      const currentValue = context.activeInput.current.value;
      if (cursorPosition > 0) {
        context.activeInput.current.value =
          currentValue.substring(0, cursorPosition - 1) +
          currentValue.substring(cursorPosition);
        context.activeInput.current.setSelectionRange(
          cursorPosition - 1,
          cursorPosition - 1
        );
      }
    }
  };

  const handleToggleKeyboardType = () => {
    context.setKeyboardType(
      context.keyboardType === "alpha" ? "numeric" : "alpha"
    );
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full text-[30px]">
      {keys.map((row, index) => (
        <div key={index} className="flex flex-row justify-center m-4 ">
          {row.map((key) => (
            <KeyboardKey
              key={key.value}
              value={key.value}
              onClick={
                key.value === "SpaceBar"
                  ? handleSpaceBar
                  : key.value === "Clear"
                  ? handleClear
                  : key.value === "Bks"
                  ? handleBackspace
                  : key.value === "?123"
                  ? handleToggleKeyboardType
                  : key.value === "ABC"
                  ? handleToggleKeyboardType
                  : undefined
              }
              customStyles={
                key.value === "SpaceBar"
                  ? { width: "600px", margin: "auto" }
                  : {}
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
