import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CustomDropdownProps = {
  items: string[];
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
};
const CustomDropdown = ({
  items,
  selectedItem,
  setSelectedItem,
}: CustomDropdownProps) => {
  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedItem(e.currentTarget.innerText!);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-primary-brown w-fit px-7 flex items-center gap-2 py-2 font-medium text-center bg-white border">
        <span className="text-secondary-gray text-xs">{selectedItem}</span>
        <IoMdArrowDropdown
          size={20}
          strokeWidth={1}
          className="text-secondary-gray"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={handleSelectItem}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
