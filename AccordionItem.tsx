import React from "react";

interface AccordionItemProps {
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div className="w-[350px] border-2 mt-3 relative">
      <div
        className="cursor-pointer flex justify-between items-center p-4 border-b border-gray-200 transition-colors"
        onClick={onToggle}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <span
          className={`transform ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
        >
          ▼
        </span>
      </div>
      <div
        className={`p-4 border-2 rounded border-black top-20 absolute w-[345px] h-[540px] ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default AccordionItem;
