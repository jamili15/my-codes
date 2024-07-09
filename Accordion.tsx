import React, { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  const handleToggleItem = (index: number) => {
    setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex justify-around items-start">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          isOpen: openItemIndex === index,
          onToggle: () => handleToggleItem(index),
        })
      )}
    </div>
  );
};

export default Accordion;
